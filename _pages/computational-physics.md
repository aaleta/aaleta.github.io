---
layout: post
permalink: /teaching/computational-physics/
title: Computational Physics
description: Resources and materials for the Computational Physics course
nav: false
toc:
  sidebar: left
---

In this course we teach various computational techniques and their applications in solving physical problems using the C programming language. 

In 2024, we introduced a new way of teaching the practical part of the course, using complex and (hopefully) interesting/funny problems that require the application of multiple techniques learned throughout the course, including tools such as GitHub. To facilitate this, we provide automated tests to help students verify the correctness of their implementations through GitHub Classroom. In this page you can find links to these assignments and some visualizations created by the students.

# 2023/2024 Projects

## Project 1: Harmonic Oscillator

**Description:** Simulate the motion of an harmonic oscillator using numerical integration methods.

**Techniques Used:** Euler method and Verlet integration.

**Link to Code:** [GitHub Repository](https://github.com/aaleta/2024_1_oscilador)

Since this was the first assignment ever and we weren't sure if students would be able to work with GitHub and Visual Studio Code, we kept it simple. The goal was to implement two numerical integration methods (Euler and Verlet) to simulate the motion of a harmonic oscillator and compare their accuracy. Later on, in the exam, we asked them to add small modifications to their code, such as a slighlty different potential.

<p align="center">
  <img src="/assets/img/2024/position.gif" alt="Position of the Harmonic Oscillator" style="max-width: 100%; width: auto; height: auto;">
</p>

## 2024/2025 Projects

## Other Resources

* **[In Spanish]** [Los malditos punteros](/assets/pdf/Punteros.pdf): notes from the 2018/2019 Computational Physics course at the University of Zaragoza on the functioning of pointers in C.

### Course Description

This section provides an overview of the Computational Physics course, including objectives, prerequisites, and learning outcomes.

**Course Objectives:**
- Understand fundamental computational methods in physics
- Develop programming skills for scientific computing
- Apply numerical techniques to solve physical problems
- Learn to analyze and visualize scientific data

**Prerequisites:**
- Basic physics knowledge (mechanics, electromagnetism)
- Programming fundamentals (preferably Python)
- Mathematical background (calculus, linear algebra)

### Schedule and Logistics

**Meeting Times:** [Add your schedule here]

**Office Hours:** [Add your office hours here]

**Grading:**
- Homework assignments: 40%
- Midterm project: 30%
- Final project: 30%

---

## Section 2: Course Materials

### Lecture Notes

Here you'll find lecture notes, slides, and supplementary materials for each topic covered in the course.

**Topics Covered:**
1. Introduction to Scientific Computing
2. Numerical Methods for Differential Equations
3. Monte Carlo Methods
4. Molecular Dynamics
5. Statistical Mechanics Simulations
6. Quantum Mechanics Applications

### Textbooks and References

**Recommended Textbooks:**
- *Computational Physics* by Nicholas Giordano and Hisao Nakanishi
- *Numerical Recipes* by Press, Teukolsky, Vetterling, and Flannery
- *A Survey of Computational Physics* by Landau, Páez, and Bordeianu

**Online Resources:**
- Course repository: [Add GitHub link]
- Python documentation
- Scientific computing libraries (NumPy, SciPy, Matplotlib)

### Code Examples

Sample code and Jupyter notebooks demonstrating key concepts:

```python
# Example: Simple numerical integration
import numpy as np

def integrate_trapezoid(f, a, b, n=1000):
    """
    Numerical integration using the trapezoid rule
    """
    x = np.linspace(a, b, n)
    y = f(x)
    h = (b - a) / (n - 1)
    return h * (np.sum(y) - (y[0] + y[-1]) / 2)

# Test with a simple function
f = lambda x: x**2
result = integrate_trapezoid(f, 0, 1)
print(f"Integral result: {result}")
```

---

## Section 3: Assignments and Projects

### Homework Assignments

Regular assignments to practice computational techniques and reinforce concepts learned in class.

**Assignment Guidelines:**
- Submit code and a brief report explaining your approach
- Include plots and visualizations where appropriate
- Comment your code clearly
- Cite any external resources used

**Current Assignments:**
1. **Assignment 1:** Numerical Differentiation and Integration
2. **Assignment 2:** Solving ODEs - Projectile Motion
3. **Assignment 3:** Random Numbers and Monte Carlo Methods
4. **Assignment 4:** Molecular Dynamics Simulation

### Projects

#### Midterm Project

**Topic:** [Add project description]

**Deliverables:**
- Working code implementation
- Written report (3-5 pages)
- Brief presentation

**Due Date:** [Add date]

#### Final Project

**Topic:** [Add project description]

**Requirements:**
- Original implementation of a computational physics problem
- Comprehensive analysis and results
- Final presentation to the class
- Complete documentation

**Due Date:** [Add date]

### Submission Instructions

All assignments should be submitted via [specify platform - e.g., GitHub, Canvas, etc.]. Include:
- Source code files
- README with instructions to run your code
- Report in PDF format
- Any additional data files needed

---

## Contact and Support

For questions or additional support, please:
- Attend office hours
- Post on the course forum/discussion board
- Email: [your email]

**Important:** Please include "[Comp Phys]" in the subject line of any emails related to this course.
