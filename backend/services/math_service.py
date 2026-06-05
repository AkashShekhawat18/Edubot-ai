class MathService:

    def __init__(self, ai_service):
        self.ai_service = ai_service

    def solve(self, question):

        q = question.lower()

        if any(word in q for word in [
            "explain",
            "steps",
            "step by step",
            "solution",
            "how"
        ]):

            prompt = f"""
You are a Maths Teacher.

Solve step by step.

Rules:
- Use simple maths notation.
- No LaTeX.
- Give final answer first.
- Then explain each step clearly.

Question:
{question}
"""

        else:

            prompt = f"""
You are a Maths Solver.

Rules:
- Give ONLY the final answer.
- No explanation.
- No LaTeX.
- Maximum 1 line.

Question:
{question}
"""

        return self.ai_service.ask_question(prompt)