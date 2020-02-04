import os
import subprocess
import fileinput
from app.main.utils.run_code_util import is_error, make_python_codefile, generate_output_error, compare_output
import json
from app.main.models.SubmissionsModel import SubmissionsModel
from app.main import db

def make_submit_folder(submission_id):
    """
        Make submission folder
    """
    cwd = os.getcwd()
    path = cwd+"/static/submit_code/s_id"+str(submission_id)
    if os.path.exists(path):
        return path
    else:
        try:
            os.makedirs(path)
        except:
            return False
    return path

def make_marks_file(path):
    wf = open(path+"/marks.txt", "w")
    wf.write('0')
    wf.close()
    return path+"/marks.txt"

def increment_marks_file(path, strength):
    wf = open(path+"/marks.txt", "r")
    marks = int(wf.read())
    wf.close()
    wf = open(path+"/marks.txt", "w")
    wf.write(str(marks+strength))
    wf.close()
    return path+"/marks.txt"

def read_marks_file(path):
    wf = open(path+"/marks.txt", "r")
    marks = int(wf.read())
    wf.close()
    return marks

def get_results(submission_id, test_cases, code, language, max_score):
    # after inserting into submissionsfolder
    path = make_submit_folder(submission_id)
    # insert code file path into submissions folder
    language = language.lower()
    if language == "python" or language == 'javascript':
        if path:
            code_file_path = make_python_codefile(code, path)
            submission_outputs = []
            total_strength = 0
            total_marks = 0

            test_case_info = {}
            for tcs in test_cases:
                total_strength = total_strength + tcs["strength"]

            for test_case in test_cases:
                output_path, error_path = generate_output_error(
                    '%s.txt'%(test_case["input_file"]), code_file_path, path, language, output_file_name="tco"+str(test_case["id"]), error_file_name="tce"+str(test_case["id"]))
                # evaluate
                # compare with challenge_settings - currently not done
                is_correct, output = compare_output(
                    output_path, '%s.txt'%(test_case["output_file"]))
                passed = is_correct and (not is_error(error_path))

                if passed:
                    test_case_info["tco%d"%(test_case["id"])] = True
                    total_marks = total_marks + test_case["strength"]
                else:
                    test_case_info["tco%d"%(test_case["id"])] = False

                submission_format = {"output_file": output_path, "time_taken": 1, "memory_taken": 1,
                                     "passed": passed, "submission_id": submission_id, "test_case_id": test_case["id"]}

                # bring into db save format
                submission_outputs.append(submission_format)

            # update
            db.session.query(SubmissionsModel).filter(SubmissionsModel.id == submission_id).update({SubmissionsModel.score : total_marks, SubmissionsModel.test_cases_info: json.dumps(test_case_info)})
            db.session.commit()

            return submission_outputs, code_file_path, total_marks
        return False, False, False
    else:
        return False, False, False

def get_result_test_case(path, code_file_path, input_file, expected_output_file, language, strength):
    
    language = language.lower()
    
    if language == "python" or language == 'javascript':
        if path:
            output_path, error_path = generate_output_error(
                '%s.txt'%(input_file), code_file_path, path, language, output_file_name="tco"+str(test_case["id"]), error_file_name="tce"+str(test_case["id"]))
            
            check_error = is_error(error_path)
            if check_error == True:
                return False, read_error(error_path), False

            if output_path == False:
                return False, "Infinite Loop", False

            is_correct, output = compare_output(output_path, expected_output_file)

            if is_correct:
                increment_marks_file(path, strength)
            
            return (''.join(output), read_error(error_path), is_correct and (not is_error(error_path)))

        return False, 'Path not found', False
    else:
        return False, 'Language not supported', False

def update_submission_marks(path, submission_id, test_case_info):
    marks = read_marks_file(path)
    try:
        db.session.query(SubmissionsModel).filter(SubmissionsModel.id == submission_id).update({SubmissionsModel.score : marks, SubmissionsModel.test_cases_info: json.dumps(test_case_info)})
        db.session.commit()
        return True
    except:
        db.session.rollback()
        return False