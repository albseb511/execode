from __future__ import print_function
import os
import subprocess
import fileinput
import multiprocessing
import sys
import time
import threading
from time import sleep
import requests
import subprocess
try:
    import thread
except ImportError:
    import _thread as thread

def refresh_server():
    username = 'parthmasai'
    token = 'e0de7e1895acdf09f570f2b8af4a1c7d9c86ecff'

    response = requests.post(
    'https://www.pythonanywhere.com/api/v0/user/{username}/webapps/parthmasai.pythonanywhere.com/reload/'.format(
        username=username
    ),
    headers={'Authorization': 'Token {token}'.format(token=token)}
    )


    if response.status_code == 200:
        print(response.content)
    else:
        print('Got unexpected status code {}: {!r}'.format(response.status_code, response.content))


def quit_function(fn_name):
    try:
        print('{0} took too long'.format(fn_name), file=sys.stderr)
        sys.stderr.flush()
        #thread.interrupt_main()
        raise ValueError
    except ValueError:
        print("stopped")
        print('refreshing the server')
        refresh_server()
    finally:
        return False, "error"

def exit_after(s):
    '''
    use as decorator to exit process if
    function takes longer than s seconds
    '''
    def outer(fn):
        def inner(*args, **kwargs):
            timer = threading.Timer(s, quit_function, args=[fn.__name__])
            timer.start()
            try:
                result = fn(*args, **kwargs)
            finally:
                timer.cancel()
            return result
        return inner
    return outer


def makeRunCodeFolder(user_id):
    """
        Check if user run code folder exists: Creates if it doesnot
    """
    cwd = os.getcwd()
    path = cwd+"/static/run_code/user"+str(user_id)
    if os.path.exists(path):
        return path
    else:
        try:
            os.makedirs(path)
        except:
            return False
    return path


def make_python_codefile(code, path):
    wf = open(path+"/code.py", "w")
    wf.write(code)
    wf.close()
    return path+"/code.py"


def make_input_file(sample_input, path):
    wg = open(path+"/in.txt", "w")
    wg.write(sample_input)
    wg.close()
    return path+"/in.txt"

def make_file(path):
    wg = open(path, "w")
    wg.close()


def make_sample_output(sample_output, path):
    wg = open(path+"/expected.txt", "w")
    wg.write(sample_output)
    wg.write("\n")
    wg.close()
    return path+"/expected.txt"


def make_js_file(code, path):
    wf = open(path+"/code.js", "w")
    wf.write(code)
    wf.close()
    return path+"/code.js"

def make_cpp_file(code, path):
    wf = open(path+"/code.cpp", "w")
    wf.write(code)
    wf.close()
    return path+"/code.cpp"

@exit_after(2)
def run_python_code(code_path, input_path, output_path, error_path):
    print("started run code")
    cmd = "python3 %s 0<%s 1>%s 2>%s"%(
            code_path, input_path, output_path, error_path)
    starttime = time.time()
    proc = subprocess.Popen([cmd], shell=True, preexec_fn=os.setsid)
    try:
        print(proc.communicate(timeout=0.5))
        t = proc.returncode
    except subprocess.TimeoutExpired:
        os.system("pkill Python")
        os.system("pkill python3.7")
        os.system("rm %s"%(output_path))
        print('killed')
        return False
    return True

@exit_after(2)
def run_python2_code(code_path, input_path, output_path, error_path):
    print("started run code")
    os.system("python3 %s 0<%s 1>%s 2>%s"%(
            code_path, input_path, output_path, error_path))

@exit_after(2)
def run_cpp_code(code_path, input_path, output_path, error_path):
    print("started cpp run code")

    os.system('g++ %s -o %s.o 2>%s'%(code_path, code_path.strip('.cpp'), error_path))
    os.system("%s.o <%s >%s "%(
            code_path.strip('.cpp'), input_path, output_path))

@exit_after(2)
def run_js_code(code_path, input_path, output_path, error_path):
    cmd = "node %s 0<%s 1>%s 2>%s"%(
            code_path, input_path, output_path, error_path)

    starttime = time.time()
    proc = subprocess.Popen([cmd], shell=True, preexec_fn=os.setsid)
    try:
        print(proc.communicate(timeout=0.5))
        t = proc.returncode
    except subprocess.TimeoutExpired:
        os.system("killall node")
        os.system("killall nodejs")
        os.system("rm %s"%(output_path))
        print('killed')
        return False
    return True

def generate_output_error(input_path, code_path, path, my_lang, output_file_name, error_file_name):
    """
        Generate output and error
    """
    output_path = path+"/"+output_file_name+".txt"
    error_path = path+"/"+error_file_name+".txt"
    make_file(output_path)
    make_file(error_path)

    if my_lang == 'javascript':
        flag = run_js_code(
            code_path, input_path, output_path, error_path)
        if flag == False:
            return False, error_path

    elif my_lang == "python":
        flag = run_python_code(
            code_path, input_path, output_path, error_path)
        if flag == False:
            return False, error_path

    elif my_lang == "python2":
        try:
            run_python2_code(
            code_path, input_path, output_path, error_path)
        except Exception as e:
            return False, e

    elif my_lang == "cpp":
        try:
            run_cpp_code(
            code_path, input_path, output_path, error_path)
        except Exception as e:
            return False, e

    return output_path, error_path


def is_error(error_path):
    wf = open(error_path)
    lines = wf.readlines()
    if len(lines) == 0:
        wf.close()
        return False
    else:
        wf.close()
        return True


def read_error(error_path):
    wf = open(error_path)
    lines = wf.readlines()
    wf.close()
    return lines


def compare_output(output_path, expected_path):
    user_output = open(output_path)
    expected_output = open(expected_path)
    output_lines = user_output.readlines()
    expected_lines = expected_output.readlines()
    user_output.close()
    expected_output.close()

    if len(output_lines) == len(expected_lines):
        for i in range(len(output_lines)):
            if output_lines[i].strip('\n') != expected_lines[i].strip('\n'):
                return False, output_lines
        return True, output_lines
    else:
        return False, output_lines


def getResults(sample_input, sample_output, language, user_id, code, is_custom_input):

    path = makeRunCodeFolder(user_id)
    my_lang = language.lower()
    if path:
        input_path = make_input_file(sample_input, path)
        expected_path = make_sample_output(sample_output, path)

        if my_lang == "javascript":
            code_file_path = make_js_file(code, path)
        elif my_lang == "python":
            code_file_path = make_python_codefile(code, path)
        elif my_lang == 'cpp':
            code_file_path = make_cpp_file(code, path)

        output_path, error_path = generate_output_error(
            input_path, code_file_path, path, my_lang, 'out','err')

        check_error = is_error(error_path)
        if check_error == True:
            return False, read_error(error_path), False

        if output_path == False:
            return False, "Infinite Loop", False

        is_correct, output = compare_output(output_path, expected_path)

        if is_custom_input:
            return (''.join(output), read_error(error_path), None)

        return (''.join(output), read_error(error_path), is_correct and (not is_error(error_path)))

    return None, None, False
