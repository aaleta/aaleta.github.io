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

## Project 2: Brownian Motion

**Description:** Simulate the Brownian motion of a student who may have a hangover in a 2D grid, avoiding obstacles and trying to get to class on time.

**Techniques Used:** Random number generation, Monte Carlo methods, and collision detection.

**Link to Code:** [GitHub Repository](https://github.com/aaleta/2024_2_brownian)

For this second project, we wanted to introduce random number generation and Monte Carlo methods. The task was to simulate a student moving in a 2D grid, where they could randomly move in different directions, but had to avoid obstacles (like buildings) and try to reach their class on time. This project required students to implement collision detection and use random numbers to determine the student's movement.

<figure style="text-align: center;">
  <video autoplay loop muted playsinline style="max-width: 100%; height: auto; width: 600px;">
    <source src="/assets/video/brownian_2024.webm" type="video/webm">
    Your browser does not support the video tag.
  </video>
  <figcaption><em>Completely wasted students trying to get to class</em></figcaption>
</figure>

<figure style="text-align: center;">
  <video autoplay loop muted playsinline style="max-width: 100%; height: auto; width: 600px;">
    <source src="/assets/video/metropolis_2024.webm" type="video/webm">
    Your browser does not support the video tag.
  </video>
  <figcaption><em>A drunk student always knows how to find their way (using Metropolis algorithm)</em></figcaption>
</figure>

---

# 2024/2025 Projects

## Project 1

## Project 2

---

# Other Resources

* **[In Spanish]** [Los malditos punteros](/assets/pdf/Punteros.pdf): notes from the 2018/2019 Computational Physics course at the University of Zaragoza on the functioning of pointers in C.

### Course Description

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
