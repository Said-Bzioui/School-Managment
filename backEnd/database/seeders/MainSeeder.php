<?php
// database/seeders/MainSeeder.php

namespace Database\Seeders;

use App\Models\Announcements;
use App\Models\Assignment;
use App\Models\Classes;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use App\Models\Student;
use App\Models\Teacher;
use App\Models\Classroom;
use App\Models\Events;
use App\Models\Exam;
use App\Models\Lesson;
use App\Models\Parents;
use App\Models\Result;
use App\Models\Subject;

class MainSeeder extends Seeder
{
    public function run(): void
    {
        // Users
        User::insert([
            // Admins
            [
            'name' => 'Admin One',
            'email' => 'admin1@example.com',
            'password' => Hash::make('password'),
            'role' => 'admin',
            'phone' => '1234567890',
            'photo' => 'admin1.jpg',
            'gender' => 'male',
            ],
            [
            'name' => 'Admin Two',
            'email' => 'admin2@example.com',
            'password' => Hash::make('password'),
            'role' => 'admin',
            'phone' => '1234567891',
            'photo' => 'admin2.jpg',
            'gender' => 'female',
            ],
            [
            'name' => 'Admin Three',
            'email' => 'admin3@example.com',
            'password' => Hash::make('password'),
            'role' => 'admin',
            'phone' => '1234567892',
            'photo' => 'admin3.jpg',
            'gender' => 'male',
            ],
            [
            'name' => 'Admin Four',
            'email' => 'admin4@example.com',
            'password' => Hash::make('password'),
            'role' => 'admin',
            'phone' => '1234567893',
            'photo' => 'admin4.jpg',
            'gender' => 'female',
            ],

            // Teachers
            [
            'name' => 'Teacher One',
            'email' => 'teacher1@example.com',
            'password' => Hash::make('password'),
            'role' => 'teacher',
            'phone' => '1234567894',
            'photo' => 'teacher1.jpg',
            'gender' => 'male',
            ],
            [
            'name' => 'Teacher Two',
            'email' => 'teacher2@example.com',
            'password' => Hash::make('password'),
            'role' => 'teacher',
            'phone' => '1234567895',
            'photo' => 'teacher2.jpg',
            'gender' => 'female',
            ],
            [
            'name' => 'Teacher Three',
            'email' => 'teacher3@example.com',
            'password' => Hash::make('password'),
            'role' => 'teacher',
            'phone' => '1234567896',
            'photo' => 'teacher3.jpg',
            'gender' => 'male',
            ],
            [
            'name' => 'Teacher Four',
            'email' => 'teacher4@example.com',
            'password' => Hash::make('password'),
            'role' => 'teacher',
            'phone' => '1234567897',
            'photo' => 'teacher4.jpg',
            'gender' => 'female',
            ],

            // Students
            [
            'name' => 'Student One',
            'email' => 'student1@example.com',
            'password' => Hash::make('password'),
            'role' => 'student',
            'phone' => '1234567898',
            'photo' => 'student1.jpg',
            'gender' => 'male',
            ],
            [
            'name' => 'Student Two',
            'email' => 'student2@example.com',
            'password' => Hash::make('password'),
            'role' => 'student',
            'phone' => '1234567899',
            'photo' => 'student2.jpg',
            'gender' => 'female',
            ],
            [
            'name' => 'Student Three',
            'email' => 'student3@example.com',
            'password' => Hash::make('password'),
            'role' => 'student',
            'phone' => '1234567800',
            'photo' => 'student3.jpg',
            'gender' => 'male',
            ],
            [
            'name' => 'Student Four',
            'email' => 'student4@example.com',
            'password' => Hash::make('password'),
            'role' => 'student',
            'phone' => '1234567801',
            'photo' => 'student4.jpg',
            'gender' => 'female',
            ],

            // Parents
            [
            'name' => 'Parent One',
            'email' => 'parent1@example.com',
            'password' => Hash::make('password'),
            'role' => 'parent',
            'phone' => '1234567802',
            'photo' => 'parent1.jpg',
            'gender' => 'male',
            ],
            [
            'name' => 'Parent Two',
            'email' => 'parent2@example.com',
            'password' => Hash::make('password'),
            'role' => 'parent',
            'phone' => '1234567803',
            'photo' => 'parent2.jpg',
            'gender' => 'female',
            ],
            [
            'name' => 'Parent Three',
            'email' => 'parent3@example.com',
            'password' => Hash::make('password'),
            'role' => 'parent',
            'phone' => '1234567804',
            'photo' => 'parent3.jpg',
            'gender' => 'male',
            ],
            [
            'name' => 'Parent Four',
            'email' => 'parent4@example.com',
            'password' => Hash::make('password'),
            'role' => 'parent',
            'phone' => '1234567805',
            'photo' => 'parent4.jpg',
            'gender' => 'female',
            ],
        ]);

        // Students
        Student::insert([
            [
                'user_id' => 9,
                'cef' => 'STU001',
                'birth_date' => '2005-01-15',
                'address' => '123 Main St',
                'class_id' => 1,
            ],
            [
                'user_id' => 10,
                'cef' => 'STU002',
                'birth_date' => '2006-02-20',
                'address' => '456 Elm St',
                'class_id' => 2,
            ],
            [
                'user_id' => 11,
                'cef' => 'STU003',
                'birth_date' => '2007-03-25',
                'address' => '789 Oak St',
                'class_id' => 3,
            ],
            [
                'user_id' => 12,
                'cef' => 'STU004',
                'birth_date' => '2008-04-30',
                'address' => '321 Pine St',
                'class_id' => 1,
            ],
        ]);
        // parents
        Parents::insert([
            [
            'user_id' => 13,
            'relation' => 'Father',
            'student_id' => 1,
            ],
            [
            'user_id' => 14,
            'relation' => 'Mother',
            'student_id' => 2,
            ],
            [
            'user_id' => 15,
            'relation' => 'Guardian',
            'student_id' => 3,
            ],
            [
            'user_id' => 16,
            'relation' => 'Father',
            'student_id' => 4,
            ],
        ]);
        // Teachers
        Teacher::insert([
            [
                'user_id' => 2,
                'speciality' => 'Mathematics',
                'hire_date' => '2015-09-01',
            ],
            [
                'user_id' => 3,
                'speciality' => 'Science',
                'hire_date' => '2016-08-15',
            ],
            [
                'user_id' => 4,
                'speciality' => 'History',
                'hire_date' => '2017-07-10',
            ],
            [
                'user_id' => 5,
                'speciality' => 'English',
                'hire_date' => '2018-06-20',
            ],
        ]);
        // classes
        Classes::insert([
            ['name' => 'Class 1', 'level' => 'Beginner', 'capacite' => 30, 'teacher_id' => 1],
            ['name' => 'Class 2', 'level' => 'Intermediate', 'capacite' => 25, 'teacher_id' => 2],
            ['name' => 'Class 3', 'level' => 'Advanced', 'capacite' => 20, 'teacher_id' => 3],
            ['name' => 'Class 4', 'level' => 'Expert', 'capacite' => 15, 'teacher_id' => 4],
            ['name' => 'Class 5', 'level' => 'Master', 'capacite' => 10, 'teacher_id' => 1],
        ]);
        // Classrooms
        Classroom::insert([
            ['name' => '1A', 'capacity' => 20],
            ['name' => '2B', 'capacity' => 20],
            ['name' => '3C', 'capacity' => 20],
        ]);
        // Subjects
        Subject::insert([
            ['name' => 'Math', 'masse_horaire' => 5, 'teacher_id' => 1],
            ['name' => 'Science', 'masse_horaire' => 4, 'teacher_id' => 2],
            ['name' => 'History', 'masse_horaire' => 3, 'teacher_id' => 3],
            ['name' => 'English', 'masse_horaire' => 4, 'teacher_id' => 4],
            ['name' => 'Physics', 'masse_horaire' => 6, 'teacher_id' => 2],
            ['name' => 'Chemistry', 'masse_horaire' => 5, 'teacher_id' => 2],
            ['name' => 'Biology', 'masse_horaire' => 4, 'teacher_id' => 2],
            ['name' => 'Geography', 'masse_horaire' => 3, 'teacher_id' => 3],
        ]);

        // Lessons
        Lesson::insert([
            [
                'classroom_id' => 1,
                'class_id' => 1,
                'subject_id' => 1,
                'teacher_id' => 1,
                'day' => 'Monday',
                'start_time' => '08:00:00',
                'end_time' => '09:30:00',
            ],
            [
                'classroom_id' => 2,
                'class_id' => 2,
                'subject_id' => 2,
                'teacher_id' => 2,
                'day' => 'Tuesday',
                'start_time' => '10:00:00',
                'end_time' => '11:30:00',
            ],
            [
                'classroom_id' => 3,
                'class_id' => 3,
                'subject_id' => 3,
                'teacher_id' => 3,
                'day' => 'Wednesday',
                'start_time' => '13:00:00',
                'end_time' => '14:30:00',
            ],
            [
                'classroom_id' => 1,
                'class_id' => 1,
                'subject_id' => 4,
                'teacher_id' => 4,
                'day' => 'Thursday',
                'start_time' => '15:00:00',
                'end_time' => '16:30:00',
            ],
        ]);

        // Exams
        Exam::insert([
            [
            'teacher_id' => 1,
            'classroom_id' => 1,
            'class_id' => 1,
            'subject_id' => 1,
            'date' => now()->addDays(5),
            ],
            [
            'teacher_id' => 2,
            'classroom_id' => 2,
            'class_id' => 2,
            'subject_id' => 2,
            'date' => now()->addDays(10),
            ],
            [
            'teacher_id' => 3,
            'classroom_id' => 3,
            'class_id' => 3,
            'subject_id' => 1,
            'date' => now()->addDays(15),
            ],
            [
            'teacher_id' => 4,
            'classroom_id' => 1,
            'class_id' => 1,
            'subject_id' => 2,
            'date' => now()->addDays(20),
            ],
        ]);

        // Results
        Result::insert([
            [
                'subject_id' => 1,
                'class_id' => 1,
                'teacher_id' => 1,
                'student_id' => 1,
                'type' => 'examen',
                'note' => 15.5,
                'date' => now(),
            ],
            [
                'subject_id' => 2,
                'class_id' => 2,
                'teacher_id' => 2,
                'student_id' => 2,
                'type' => 'controle',
                'note' => 12.0,
                'date' => now()->subDays(2),
            ],
            [
                'subject_id' => 1,
                'class_id' => 3,
                'teacher_id' => 3,
                'student_id' => 3,
                'type' => 'controle',
                'note' => 18.0,
                'date' => now()->subDays(5),
            ],
            [
                'subject_id' => 2,
                'class_id' => 1,
                'teacher_id' => 4,
                'student_id' => 4,
                'type' => 'devoir',
                'note' => 14.0,
                'date' => now()->subDays(10),
            ],
        ]);

        // Assignments
        Assignment::insert([
            [
                'subject_id' => 1,
                'class_id' => 1,
                'teacher_id' => 1,
                'DueDate' => now()->addDays(7),
            ],
            [
                'subject_id' => 2,
                'class_id' => 2,
                'teacher_id' => 2,
                'DueDate' => now()->addDays(10),
            ],
            [
                'subject_id' => 3,
                'class_id' => 3,
                'teacher_id' => 3,
                'DueDate' => now()->addDays(14),
            ],
            [
                'subject_id' => 4,
                'class_id' => 1,
                'teacher_id' => 4,
                'DueDate' => now()->addDays(5),
            ],
        ]);
        // Events
        Events::insert([
            [
            'title' => 'Science Fair',
            'description' => 'Annual science fair showcasing student projects.',
            'date' => now()->addDays(3),
            'start_time' => '10:00:00',
            'end_time' => '14:00:00',
            'created_by' => 1,
            'class_id' => 1,
            ],
            [
            'title' => 'Math Workshop',
            'description' => 'Interactive workshop on advanced math topics.',
            'date' => now()->addDays(7),
            'start_time' => '09:00:00',
            'end_time' => '12:00:00',
            'created_by' => 2,
            'class_id' => 2,
            ],
            [
            'title' => 'History Seminar',
            'description' => 'Seminar on world history and its impact.',
            'date' => now()->addDays(10),
            'start_time' => '13:00:00',
            'end_time' => '16:00:00',
            'created_by' => 3,
            'class_id' => 3,
            ],
            [
            'title' => 'English Debate',
            'description' => 'Debate competition for English language students.',
            'date' => now()->addDays(14),
            'start_time' => '15:00:00',
            'end_time' => '17:00:00',
            'created_by' => 4,
            'class_id' => 1,
            ],
        ]);
        // Announcements
        Announcements::insert([
            [
            'title' => 'Holiday Announcement',
            'content' => 'School will be closed for the holidays from December 20th to January 5th.',
            'user_id' => 1,
            'target' => 'all',
            ],
            [
            'title' => 'Exam Schedule',
            'content' => 'The final exam schedule has been published. Please check the notice board.',
            'user_id' => 2,
            'target' => 'students',
            ],
            [
            'title' => 'Parent-Teacher Meeting',
            'content' => 'A parent-teacher meeting is scheduled for next Friday at 3 PM.',
            'user_id' => 3,
            'target' => 'parents',
            ],
            [
            'title' => 'New Library Books',
            'content' => 'New books have been added to the library. Visit to explore the collection.',
            'user_id' => 4,
            'target' => 'teachers',
            ],
        ]);
    }
}