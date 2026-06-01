from flask import jsonify


def success_response(data: dict, status_code: int = 200):
    return jsonify({"success": True, "data": data}), status_code


def error_response(code: str, message: str, status_code: int = 400):
    return jsonify({
        "success": False,
        "error": {
            "code": code,
            "message": message,
        },
    }), status_code
