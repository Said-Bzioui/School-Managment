<?php
// database/seeders/MainSeeder.php

namespace Database\Seeders;

use App\Models\Admin;
use App\Models\Announcements;
use App\Models\Assignment;
use App\Models\class_subject;
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
use App\Models\Poll;
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
            'email' => 'admin1@example.com',
            'password' => Hash::make('password'),
            'role' => 'admin',
            ],
            [
            'email' => 'admin2@example.com',
            'password' => Hash::make('password'),
            'role' => 'admin',
            ],
            [
            'email' => 'admin3@example.com',
            'password' => Hash::make('password'),
            'role' => 'admin',
            ],
            [
            'email' => 'admin4@example.com',
            'password' => Hash::make('password'),
            'role' => 'admin',
            ],
            // Teachers
            [
            'email' => 'teacher1@example.com',
            'password' => Hash::make('password'),
            'role' => 'teacher',
            ],
            [
            'email' => 'teacher2@example.com',
            'password' => Hash::make('password'),
            'role' => 'teacher',
            ],
            [
            'email' => 'teacher3@example.com',
            'password' => Hash::make('password'),
            'role' => 'teacher',
            ],
            [
            'email' => 'teacher4@example.com',
            'password' => Hash::make('password'),
            'role' => 'teacher',
            ],
            // Students (user_id: 9-108)
            // Class 1
            ['email' => 'alice1@student.com', 'password' => Hash::make('password'), 'role' => 'student'],
            ['email' => 'bob1@student.com', 'password' => Hash::make('password'), 'role' => 'student'],
            ['email' => 'carol1@student.com', 'password' => Hash::make('password'), 'role' => 'student'],
            ['email' => 'david1@student.com', 'password' => Hash::make('password'), 'role' => 'student'],
            ['email' => 'eva1@student.com', 'password' => Hash::make('password'), 'role' => 'student'],
            ['email' => 'frank1@student.com', 'password' => Hash::make('password'), 'role' => 'student'],
            ['email' => 'grace1@student.com', 'password' => Hash::make('password'), 'role' => 'student'],
            ['email' => 'henry1@student.com', 'password' => Hash::make('password'), 'role' => 'student'],
            ['email' => 'ivy1@student.com', 'password' => Hash::make('password'), 'role' => 'student'],
            ['email' => 'jack1@student.com', 'password' => Hash::make('password'), 'role' => 'student'],
            // Class 2
            ['email' => 'alice2@student.com', 'password' => Hash::make('password'), 'role' => 'student'],
            ['email' => 'bob2@student.com', 'password' => Hash::make('password'), 'role' => 'student'],
            ['email' => 'carol2@student.com', 'password' => Hash::make('password'), 'role' => 'student'],
            ['email' => 'david2@student.com', 'password' => Hash::make('password'), 'role' => 'student'],
            ['email' => 'eva2@student.com', 'password' => Hash::make('password'), 'role' => 'student'],
            ['email' => 'frank2@student.com', 'password' => Hash::make('password'), 'role' => 'student'],
            ['email' => 'grace2@student.com', 'password' => Hash::make('password'), 'role' => 'student'],
            ['email' => 'henry2@student.com', 'password' => Hash::make('password'), 'role' => 'student'],
            ['email' => 'ivy2@student.com', 'password' => Hash::make('password'), 'role' => 'student'],
            ['email' => 'jack2@student.com', 'password' => Hash::make('password'), 'role' => 'student'],
            // Class 3
            ['email' => 'alice3@student.com', 'password' => Hash::make('password'), 'role' => 'student'],
            ['email' => 'bob3@student.com', 'password' => Hash::make('password'), 'role' => 'student'],
            ['email' => 'carol3@student.com', 'password' => Hash::make('password'), 'role' => 'student'],
            ['email' => 'david3@student.com', 'password' => Hash::make('password'), 'role' => 'student'],
            ['email' => 'eva3@student.com', 'password' => Hash::make('password'), 'role' => 'student'],
            ['email' => 'frank3@student.com', 'password' => Hash::make('password'), 'role' => 'student'],
            ['email' => 'grace3@student.com', 'password' => Hash::make('password'), 'role' => 'student'],
            ['email' => 'henry3@student.com', 'password' => Hash::make('password'), 'role' => 'student'],
            ['email' => 'ivy3@student.com', 'password' => Hash::make('password'), 'role' => 'student'],
            ['email' => 'jack3@student.com', 'password' => Hash::make('password'), 'role' => 'student'],
            // Class 4
            ['email' => 'alice4@student.com', 'password' => Hash::make('password'), 'role' => 'student'],
            ['email' => 'bob4@student.com', 'password' => Hash::make('password'), 'role' => 'student'],
            ['email' => 'carol4@student.com', 'password' => Hash::make('password'), 'role' => 'student'],
            ['email' => 'david4@student.com', 'password' => Hash::make('password'), 'role' => 'student'],
            ['email' => 'eva4@student.com', 'password' => Hash::make('password'), 'role' => 'student'],
            ['email' => 'frank4@student.com', 'password' => Hash::make('password'), 'role' => 'student'],
            ['email' => 'grace4@student.com', 'password' => Hash::make('password'), 'role' => 'student'],
            ['email' => 'henry4@student.com', 'password' => Hash::make('password'), 'role' => 'student'],
            ['email' => 'ivy4@student.com', 'password' => Hash::make('password'), 'role' => 'student'],
            ['email' => 'jack4@student.com', 'password' => Hash::make('password'), 'role' => 'student'],
            // Class 5
            ['email' => 'alice5@student.com', 'password' => Hash::make('password'), 'role' => 'student'],
            ['email' => 'bob5@student.com', 'password' => Hash::make('password'), 'role' => 'student'],
            ['email' => 'carol5@student.com', 'password' => Hash::make('password'), 'role' => 'student'],
            ['email' => 'david5@student.com', 'password' => Hash::make('password'), 'role' => 'student'],
            ['email' => 'eva5@student.com', 'password' => Hash::make('password'), 'role' => 'student'],
            ['email' => 'frank5@student.com', 'password' => Hash::make('password'), 'role' => 'student'],
            ['email' => 'grace5@student.com', 'password' => Hash::make('password'), 'role' => 'student'],
            ['email' => 'henry5@student.com', 'password' => Hash::make('password'), 'role' => 'student'],
            ['email' => 'ivy5@student.com', 'password' => Hash::make('password'), 'role' => 'student'],
            ['email' => 'jack5@student.com', 'password' => Hash::make('password'), 'role' => 'student'],
            // Class 6
            ['email' => 'alice6@student.com', 'password' => Hash::make('password'), 'role' => 'student'],
            ['email' => 'bob6@student.com', 'password' => Hash::make('password'), 'role' => 'student'],
            ['email' => 'carol6@student.com', 'password' => Hash::make('password'), 'role' => 'student'],
            ['email' => 'david6@student.com', 'password' => Hash::make('password'), 'role' => 'student'],
            ['email' => 'eva6@student.com', 'password' => Hash::make('password'), 'role' => 'student'],
            ['email' => 'frank6@student.com', 'password' => Hash::make('password'), 'role' => 'student'],
            ['email' => 'grace6@student.com', 'password' => Hash::make('password'), 'role' => 'student'],
            ['email' => 'henry6@student.com', 'password' => Hash::make('password'), 'role' => 'student'],
            ['email' => 'ivy6@student.com', 'password' => Hash::make('password'), 'role' => 'student'],
            ['email' => 'jack6@student.com', 'password' => Hash::make('password'), 'role' => 'student'],
            // Class 7
            ['email' => 'alice7@student.com', 'password' => Hash::make('password'), 'role' => 'student'],
            ['email' => 'bob7@student.com', 'password' => Hash::make('password'), 'role' => 'student'],
            ['email' => 'carol7@student.com', 'password' => Hash::make('password'), 'role' => 'student'],
            ['email' => 'david7@student.com', 'password' => Hash::make('password'), 'role' => 'student'],
            ['email' => 'eva7@student.com', 'password' => Hash::make('password'), 'role' => 'student'],
            ['email' => 'frank7@student.com', 'password' => Hash::make('password'), 'role' => 'student'],
            ['email' => 'grace7@student.com', 'password' => Hash::make('password'), 'role' => 'student'],
            ['email' => 'henry7@student.com', 'password' => Hash::make('password'), 'role' => 'student'],
            ['email' => 'ivy7@student.com', 'password' => Hash::make('password'), 'role' => 'student'],
            ['email' => 'jack7@student.com', 'password' => Hash::make('password'), 'role' => 'student'],
            // Class 8
            ['email' => 'alice8@student.com', 'password' => Hash::make('password'), 'role' => 'student'],
            ['email' => 'bob8@student.com', 'password' => Hash::make('password'), 'role' => 'student'],
            ['email' => 'carol8@student.com', 'password' => Hash::make('password'), 'role' => 'student'],
            ['email' => 'david8@student.com', 'password' => Hash::make('password'), 'role' => 'student'],
            ['email' => 'eva8@student.com', 'password' => Hash::make('password'), 'role' => 'student'],
            ['email' => 'frank8@student.com', 'password' => Hash::make('password'), 'role' => 'student'],
            ['email' => 'grace8@student.com', 'password' => Hash::make('password'), 'role' => 'student'],
            ['email' => 'henry8@student.com', 'password' => Hash::make('password'), 'role' => 'student'],
            ['email' => 'ivy8@student.com', 'password' => Hash::make('password'), 'role' => 'student'],
            ['email' => 'jack8@student.com', 'password' => Hash::make('password'), 'role' => 'student'],
            // Class 9
            ['email' => 'alice9@student.com', 'password' => Hash::make('password'), 'role' => 'student'],
            ['email' => 'bob9@student.com', 'password' => Hash::make('password'), 'role' => 'student'],
            ['email' => 'carol9@student.com', 'password' => Hash::make('password'), 'role' => 'student'],
            ['email' => 'david9@student.com', 'password' => Hash::make('password'), 'role' => 'student'],
            ['email' => 'eva9@student.com', 'password' => Hash::make('password'), 'role' => 'student'],
            ['email' => 'frank9@student.com', 'password' => Hash::make('password'), 'role' => 'student'],
            ['email' => 'grace9@student.com', 'password' => Hash::make('password'), 'role' => 'student'],
            ['email' => 'henry9@student.com', 'password' => Hash::make('password'), 'role' => 'student'],
            ['email' => 'ivy9@student.com', 'password' => Hash::make('password'), 'role' => 'student'],
            ['email' => 'jack9@student.com', 'password' => Hash::make('password'), 'role' => 'student'],
            // Class 10
            ['email' => 'alice10@student.com', 'password' => Hash::make('password'), 'role' => 'student'],
            ['email' => 'bob10@student.com', 'password' => Hash::make('password'), 'role' => 'student'],
            ['email' => 'carol10@student.com', 'password' => Hash::make('password'), 'role' => 'student'],
            ['email' => 'david10@student.com', 'password' => Hash::make('password'), 'role' => 'student'],
            ['email' => 'eva10@student.com', 'password' => Hash::make('password'), 'role' => 'student'],
            ['email' => 'frank10@student.com', 'password' => Hash::make('password'), 'role' => 'student'],
            ['email' => 'grace10@student.com', 'password' => Hash::make('password'), 'role' => 'student'],
            ['email' => 'henry10@student.com', 'password' => Hash::make('password'), 'role' => 'student'],
            ['email' => 'ivy10@student.com', 'password' => Hash::make('password'), 'role' => 'student'],
            ['email' => 'jack10@student.com', 'password' => Hash::make('password'), 'role' => 'student'],
            // Parents (user_id: 13-16)
            ['email' => 'parent1@example.com', 'password' => Hash::make('password'), 'role' => 'parent'],
            ['email' => 'parent2@example.com', 'password' => Hash::make('password'), 'role' => 'parent'],
            ['email' => 'parent3@example.com', 'password' => Hash::make('password'), 'role' => 'parent'],
            ['email' => 'parent4@example.com', 'password' => Hash::make('password'), 'role' => 'parent'],
        ]);
        // Admins
        Admin::insert([
            [
            'nom' => 'Admin',
            'prenom' => 'One',
            'user_id' => 1, // admin1@example.com
            'photo' => '',
            ],
            [
            'nom' => 'Admin',
            'prenom' => 'Two',
            'user_id' => 2, // admin2@example.com
            'photo' => '',
            ],
            [
            'nom' => 'Admin',
            'prenom' => 'Three',
            'user_id' => 3, // admin3@example.com
            'photo' => '',
            ],
            [
            'nom' => 'Admin',
            'prenom' => 'Four',
            'user_id' => 4, // admin4@example.com
            'photo' => '',
            ],
        ]);
        // Students
        // 10 students for each of 10 classes, no loops
        Student::insert([
            // Class 1
            ['user_id' => 9,  'nom' => 'Smith',  'prenom' => 'Alice1',  'phone' => '0600000009',  'photo' => 'students/alice1.jpg',  'gender' => 'female', 'cef' => 'STU001', 'birth_date' => '2005-01-15', 'address' => '1 Main St',  'class_id' => 1],
            ['user_id' => 10, 'nom' => 'Johnson','prenom' => 'Bob1',    'phone' => '0600000010',  'photo' => 'students/bob1.jpg',    'gender' => 'male',   'cef' => 'STU002', 'birth_date' => '2005-01-15', 'address' => '1 Main St',  'class_id' => 1],
            ['user_id' => 11, 'nom' => 'Lee',    'prenom' => 'Carol1',  'phone' => '0600000011',  'photo' => 'students/carol1.jpg',  'gender' => 'female', 'cef' => 'STU003', 'birth_date' => '2005-01-15', 'address' => '1 Main St',  'class_id' => 1],
            ['user_id' => 12, 'nom' => 'Kim',    'prenom' => 'David1',  'phone' => '0600000012',  'photo' => 'students/david1.jpg',  'gender' => 'male',   'cef' => 'STU004', 'birth_date' => '2005-01-15', 'address' => '1 Main St',  'class_id' => 1],
            ['user_id' => 13, 'nom' => 'Brown',  'prenom' => 'Eva1',    'phone' => '0600000013',  'photo' => 'students/eva1.jpg',    'gender' => 'female', 'cef' => 'STU005', 'birth_date' => '2005-01-15', 'address' => '1 Main St',  'class_id' => 1],
            ['user_id' => 14, 'nom' => 'Wilson', 'prenom' => 'Frank1',  'phone' => '0600000014',  'photo' => 'students/frank1.jpg',  'gender' => 'male',   'cef' => 'STU006', 'birth_date' => '2005-01-15', 'address' => '1 Main St',  'class_id' => 1],
            ['user_id' => 15, 'nom' => 'Davis',  'prenom' => 'Grace1',  'phone' => '0600000015',  'photo' => 'students/grace1.jpg',  'gender' => 'female', 'cef' => 'STU007', 'birth_date' => '2005-01-15', 'address' => '1 Main St',  'class_id' => 1],
            ['user_id' => 16, 'nom' => 'Miller', 'prenom' => 'Henry1',  'phone' => '0600000016',  'photo' => 'students/henry1.jpg',  'gender' => 'male',   'cef' => 'STU008', 'birth_date' => '2005-01-15', 'address' => '1 Main St',  'class_id' => 1],
            ['user_id' => 17, 'nom' => 'Moore',  'prenom' => 'Ivy1',    'phone' => '0600000017',  'photo' => 'students/ivy1.jpg',    'gender' => 'female', 'cef' => 'STU009', 'birth_date' => '2005-01-15', 'address' => '1 Main St',  'class_id' => 1],
            ['user_id' => 18, 'nom' => 'Taylor', 'prenom' => 'Jack1',   'phone' => '0600000018',  'photo' => 'students/jack1.jpg',   'gender' => 'male',   'cef' => 'STU010', 'birth_date' => '2005-01-15', 'address' => '1 Main St',  'class_id' => 1],

            // Class 2
            ['user_id' => 19, 'nom' => 'Smith',  'prenom' => 'Alice2',  'phone' => '0600000019',  'photo' => 'students/alice2.jpg',  'gender' => 'female', 'cef' => 'STU011', 'birth_date' => '2005-01-15', 'address' => '2 Main St',  'class_id' => 2],
            ['user_id' => 20, 'nom' => 'Johnson','prenom' => 'Bob2',    'phone' => '0600000020',  'photo' => 'students/bob2.jpg',    'gender' => 'male',   'cef' => 'STU012', 'birth_date' => '2005-01-15', 'address' => '2 Main St',  'class_id' => 2],
            ['user_id' => 21, 'nom' => 'Lee',    'prenom' => 'Carol2',  'phone' => '0600000021',  'photo' => 'students/carol2.jpg',  'gender' => 'female', 'cef' => 'STU013', 'birth_date' => '2005-01-15', 'address' => '2 Main St',  'class_id' => 2],
            ['user_id' => 22, 'nom' => 'Kim',    'prenom' => 'David2',  'phone' => '0600000022',  'photo' => 'students/david2.jpg',  'gender' => 'male',   'cef' => 'STU014', 'birth_date' => '2005-01-15', 'address' => '2 Main St',  'class_id' => 2],
            ['user_id' => 23, 'nom' => 'Brown',  'prenom' => 'Eva2',    'phone' => '0600000023',  'photo' => 'students/eva2.jpg',    'gender' => 'female', 'cef' => 'STU015', 'birth_date' => '2005-01-15', 'address' => '2 Main St',  'class_id' => 2],
            ['user_id' => 24, 'nom' => 'Wilson', 'prenom' => 'Frank2',  'phone' => '0600000024',  'photo' => 'students/frank2.jpg',  'gender' => 'male',   'cef' => 'STU016', 'birth_date' => '2005-01-15', 'address' => '2 Main St',  'class_id' => 2],
            ['user_id' => 25, 'nom' => 'Davis',  'prenom' => 'Grace2',  'phone' => '0600000025',  'photo' => 'students/grace2.jpg',  'gender' => 'female', 'cef' => 'STU017', 'birth_date' => '2005-01-15', 'address' => '2 Main St',  'class_id' => 2],
            ['user_id' => 26, 'nom' => 'Miller', 'prenom' => 'Henry2',  'phone' => '0600000026',  'photo' => 'students/henry2.jpg',  'gender' => 'male',   'cef' => 'STU018', 'birth_date' => '2005-01-15', 'address' => '2 Main St',  'class_id' => 2],
            ['user_id' => 27, 'nom' => 'Moore',  'prenom' => 'Ivy2',    'phone' => '0600000027',  'photo' => 'students/ivy2.jpg',    'gender' => 'female', 'cef' => 'STU019', 'birth_date' => '2005-01-15', 'address' => '2 Main St',  'class_id' => 2],
            ['user_id' => 28, 'nom' => 'Taylor', 'prenom' => 'Jack2',   'phone' => '0600000028',  'photo' => 'students/jack2.jpg',   'gender' => 'male',   'cef' => 'STU020', 'birth_date' => '2005-01-15', 'address' => '2 Main St',  'class_id' => 2],

            // Class 3
            ['user_id' => 29, 'nom' => 'Smith',  'prenom' => 'Alice3',  'phone' => '0600000029',  'photo' => 'students/alice3.jpg',  'gender' => 'female', 'cef' => 'STU021', 'birth_date' => '2005-01-15', 'address' => '3 Main St',  'class_id' => 3],
            ['user_id' => 30, 'nom' => 'Johnson','prenom' => 'Bob3',    'phone' => '0600000030',  'photo' => 'students/bob3.jpg',    'gender' => 'male',   'cef' => 'STU022', 'birth_date' => '2005-01-15', 'address' => '3 Main St',  'class_id' => 3],
            ['user_id' => 31, 'nom' => 'Lee',    'prenom' => 'Carol3',  'phone' => '0600000031',  'photo' => 'students/carol3.jpg',  'gender' => 'female', 'cef' => 'STU023', 'birth_date' => '2005-01-15', 'address' => '3 Main St',  'class_id' => 3],
            ['user_id' => 32, 'nom' => 'Kim',    'prenom' => 'David3',  'phone' => '0600000032',  'photo' => 'students/david3.jpg',  'gender' => 'male',   'cef' => 'STU024', 'birth_date' => '2005-01-15', 'address' => '3 Main St',  'class_id' => 3],
            ['user_id' => 33, 'nom' => 'Brown',  'prenom' => 'Eva3',    'phone' => '0600000033',  'photo' => 'students/eva3.jpg',    'gender' => 'female', 'cef' => 'STU025', 'birth_date' => '2005-01-15', 'address' => '3 Main St',  'class_id' => 3],
            ['user_id' => 34, 'nom' => 'Wilson', 'prenom' => 'Frank3',  'phone' => '0600000034',  'photo' => 'students/frank3.jpg',  'gender' => 'male',   'cef' => 'STU026', 'birth_date' => '2005-01-15', 'address' => '3 Main St',  'class_id' => 3],
            ['user_id' => 35, 'nom' => 'Davis',  'prenom' => 'Grace3',  'phone' => '0600000035',  'photo' => 'students/grace3.jpg',  'gender' => 'female', 'cef' => 'STU027', 'birth_date' => '2005-01-15', 'address' => '3 Main St',  'class_id' => 3],
            ['user_id' => 36, 'nom' => 'Miller', 'prenom' => 'Henry3',  'phone' => '0600000036',  'photo' => 'students/henry3.jpg',  'gender' => 'male',   'cef' => 'STU028', 'birth_date' => '2005-01-15', 'address' => '3 Main St',  'class_id' => 3],
            ['user_id' => 37, 'nom' => 'Moore',  'prenom' => 'Ivy3',    'phone' => '0600000037',  'photo' => 'students/ivy3.jpg',    'gender' => 'female', 'cef' => 'STU029', 'birth_date' => '2005-01-15', 'address' => '3 Main St',  'class_id' => 3],
            ['user_id' => 38, 'nom' => 'Taylor', 'prenom' => 'Jack3',   'phone' => '0600000038',  'photo' => 'students/jack3.jpg',   'gender' => 'male',   'cef' => 'STU030', 'birth_date' => '2005-01-15', 'address' => '3 Main St',  'class_id' => 3],

            // Class 4
            ['user_id' => 39, 'nom' => 'Smith',  'prenom' => 'Alice4',  'phone' => '0600000039',  'photo' => 'students/alice4.jpg',  'gender' => 'female', 'cef' => 'STU031', 'birth_date' => '2005-01-15', 'address' => '4 Main St',  'class_id' => 4],
            ['user_id' => 40, 'nom' => 'Johnson','prenom' => 'Bob4',    'phone' => '0600000040',  'photo' => 'students/bob4.jpg',    'gender' => 'male',   'cef' => 'STU032', 'birth_date' => '2005-01-15', 'address' => '4 Main St',  'class_id' => 4],
            ['user_id' => 41, 'nom' => 'Lee',    'prenom' => 'Carol4',  'phone' => '0600000041',  'photo' => 'students/carol4.jpg',  'gender' => 'female', 'cef' => 'STU033', 'birth_date' => '2005-01-15', 'address' => '4 Main St',  'class_id' => 4],
            ['user_id' => 42, 'nom' => 'Kim',    'prenom' => 'David4',  'phone' => '0600000042',  'photo' => 'students/david4.jpg',  'gender' => 'male',   'cef' => 'STU034', 'birth_date' => '2005-01-15', 'address' => '4 Main St',  'class_id' => 4],
            ['user_id' => 43, 'nom' => 'Brown',  'prenom' => 'Eva4',    'phone' => '0600000043',  'photo' => 'students/eva4.jpg',    'gender' => 'female', 'cef' => 'STU035', 'birth_date' => '2005-01-15', 'address' => '4 Main St',  'class_id' => 4],
            ['user_id' => 44, 'nom' => 'Wilson', 'prenom' => 'Frank4',  'phone' => '0600000044',  'photo' => 'students/frank4.jpg',  'gender' => 'male',   'cef' => 'STU036', 'birth_date' => '2005-01-15', 'address' => '4 Main St',  'class_id' => 4],
            ['user_id' => 45, 'nom' => 'Davis',  'prenom' => 'Grace4',  'phone' => '0600000045',  'photo' => 'students/grace4.jpg',  'gender' => 'female', 'cef' => 'STU037', 'birth_date' => '2005-01-15', 'address' => '4 Main St',  'class_id' => 4],
            ['user_id' => 46, 'nom' => 'Miller', 'prenom' => 'Henry4',  'phone' => '0600000046',  'photo' => 'students/henry4.jpg',  'gender' => 'male',   'cef' => 'STU038', 'birth_date' => '2005-01-15', 'address' => '4 Main St',  'class_id' => 4],
            ['user_id' => 47, 'nom' => 'Moore',  'prenom' => 'Ivy4',    'phone' => '0600000047',  'photo' => 'students/ivy4.jpg',    'gender' => 'female', 'cef' => 'STU039', 'birth_date' => '2005-01-15', 'address' => '4 Main St',  'class_id' => 4],
            ['user_id' => 48, 'nom' => 'Taylor', 'prenom' => 'Jack4',   'phone' => '0600000048',  'photo' => 'students/jack4.jpg',   'gender' => 'male',   'cef' => 'STU040', 'birth_date' => '2005-01-15', 'address' => '4 Main St',  'class_id' => 4],

            // Class 5
            ['user_id' => 49, 'nom' => 'Smith',  'prenom' => 'Alice5',  'phone' => '0600000049',  'photo' => 'students/alice5.jpg',  'gender' => 'female', 'cef' => 'STU041', 'birth_date' => '2005-01-15', 'address' => '5 Main St',  'class_id' => 5],
            ['user_id' => 50, 'nom' => 'Johnson','prenom' => 'Bob5',    'phone' => '0600000050',  'photo' => 'students/bob5.jpg',    'gender' => 'male',   'cef' => 'STU042', 'birth_date' => '2005-01-15', 'address' => '5 Main St',  'class_id' => 5],
            ['user_id' => 51, 'nom' => 'Lee',    'prenom' => 'Carol5',  'phone' => '0600000051',  'photo' => 'students/carol5.jpg',  'gender' => 'female', 'cef' => 'STU043', 'birth_date' => '2005-01-15', 'address' => '5 Main St',  'class_id' => 5],
            ['user_id' => 52, 'nom' => 'Kim',    'prenom' => 'David5',  'phone' => '0600000052',  'photo' => 'students/david5.jpg',  'gender' => 'male',   'cef' => 'STU044', 'birth_date' => '2005-01-15', 'address' => '5 Main St',  'class_id' => 5],
            ['user_id' => 53, 'nom' => 'Brown',  'prenom' => 'Eva5',    'phone' => '0600000053',  'photo' => 'students/eva5.jpg',    'gender' => 'female', 'cef' => 'STU045', 'birth_date' => '2005-01-15', 'address' => '5 Main St',  'class_id' => 5],
            ['user_id' => 54, 'nom' => 'Wilson', 'prenom' => 'Frank5',  'phone' => '0600000054',  'photo' => 'students/frank5.jpg',  'gender' => 'male',   'cef' => 'STU046', 'birth_date' => '2005-01-15', 'address' => '5 Main St',  'class_id' => 5],
            ['user_id' => 55, 'nom' => 'Davis',  'prenom' => 'Grace5',  'phone' => '0600000055',  'photo' => 'students/grace5.jpg',  'gender' => 'female', 'cef' => 'STU047', 'birth_date' => '2005-01-15', 'address' => '5 Main St',  'class_id' => 5],
            ['user_id' => 56, 'nom' => 'Miller', 'prenom' => 'Henry5',  'phone' => '0600000056',  'photo' => 'students/henry5.jpg',  'gender' => 'male',   'cef' => 'STU048', 'birth_date' => '2005-01-15', 'address' => '5 Main St',  'class_id' => 5],
            ['user_id' => 57, 'nom' => 'Moore',  'prenom' => 'Ivy5',    'phone' => '0600000057',  'photo' => 'students/ivy5.jpg',    'gender' => 'female', 'cef' => 'STU049', 'birth_date' => '2005-01-15', 'address' => '5 Main St',  'class_id' => 5],
            ['user_id' => 58, 'nom' => 'Taylor', 'prenom' => 'Jack5',   'phone' => '0600000058',  'photo' => 'students/jack5.jpg',   'gender' => 'male',   'cef' => 'STU050', 'birth_date' => '2005-01-15', 'address' => '5 Main St',  'class_id' => 5],

            // Class 6
            ['user_id' => 59, 'nom' => 'Smith',  'prenom' => 'Alice6',  'phone' => '0600000059',  'photo' => 'students/alice6.jpg',  'gender' => 'female', 'cef' => 'STU051', 'birth_date' => '2005-01-15', 'address' => '6 Main St',  'class_id' => 6],
            ['user_id' => 60, 'nom' => 'Johnson','prenom' => 'Bob6',    'phone' => '0600000060',  'photo' => 'students/bob6.jpg',    'gender' => 'male',   'cef' => 'STU052', 'birth_date' => '2005-01-15', 'address' => '6 Main St',  'class_id' => 6],
            ['user_id' => 61, 'nom' => 'Lee',    'prenom' => 'Carol6',  'phone' => '0600000061',  'photo' => 'students/carol6.jpg',  'gender' => 'female', 'cef' => 'STU053', 'birth_date' => '2005-01-15', 'address' => '6 Main St',  'class_id' => 6],
            ['user_id' => 62, 'nom' => 'Kim',    'prenom' => 'David6',  'phone' => '0600000062',  'photo' => 'students/david6.jpg',  'gender' => 'male',   'cef' => 'STU054', 'birth_date' => '2005-01-15', 'address' => '6 Main St',  'class_id' => 6],
            ['user_id' => 63, 'nom' => 'Brown',  'prenom' => 'Eva6',    'phone' => '0600000063',  'photo' => 'students/eva6.jpg',    'gender' => 'female', 'cef' => 'STU055', 'birth_date' => '2005-01-15', 'address' => '6 Main St',  'class_id' => 6],
            ['user_id' => 64, 'nom' => 'Wilson', 'prenom' => 'Frank6',  'phone' => '0600000064',  'photo' => 'students/frank6.jpg',  'gender' => 'male',   'cef' => 'STU056', 'birth_date' => '2005-01-15', 'address' => '6 Main St',  'class_id' => 6],
            ['user_id' => 65, 'nom' => 'Davis',  'prenom' => 'Grace6',  'phone' => '0600000065',  'photo' => 'students/grace6.jpg',  'gender' => 'female', 'cef' => 'STU057', 'birth_date' => '2005-01-15', 'address' => '6 Main St',  'class_id' => 6],
            ['user_id' => 66, 'nom' => 'Miller', 'prenom' => 'Henry6',  'phone' => '0600000066',  'photo' => 'students/henry6.jpg',  'gender' => 'male',   'cef' => 'STU058', 'birth_date' => '2005-01-15', 'address' => '6 Main St',  'class_id' => 6],
            ['user_id' => 67, 'nom' => 'Moore',  'prenom' => 'Ivy6',    'phone' => '0600000067',  'photo' => 'students/ivy6.jpg',    'gender' => 'female', 'cef' => 'STU059', 'birth_date' => '2005-01-15', 'address' => '6 Main St',  'class_id' => 6],
            ['user_id' => 68, 'nom' => 'Taylor', 'prenom' => 'Jack6',   'phone' => '0600000068',  'photo' => 'students/jack6.jpg',   'gender' => 'male',   'cef' => 'STU060', 'birth_date' => '2005-01-15', 'address' => '6 Main St',  'class_id' => 6],

            // Class 7
            ['user_id' => 69, 'nom' => 'Smith',  'prenom' => 'Alice7',  'phone' => '0600000069',  'photo' => 'students/alice7.jpg',  'gender' => 'female', 'cef' => 'STU061', 'birth_date' => '2005-01-15', 'address' => '7 Main St',  'class_id' => 7],
            ['user_id' => 70, 'nom' => 'Johnson','prenom' => 'Bob7',    'phone' => '0600000070',  'photo' => 'students/bob7.jpg',    'gender' => 'male',   'cef' => 'STU062', 'birth_date' => '2005-01-15', 'address' => '7 Main St',  'class_id' => 7],
            ['user_id' => 71, 'nom' => 'Lee',    'prenom' => 'Carol7',  'phone' => '0600000071',  'photo' => 'students/carol7.jpg',  'gender' => 'female', 'cef' => 'STU063', 'birth_date' => '2005-01-15', 'address' => '7 Main St',  'class_id' => 7],
            ['user_id' => 72, 'nom' => 'Kim',    'prenom' => 'David7',  'phone' => '0600000072',  'photo' => 'students/david7.jpg',  'gender' => 'male',   'cef' => 'STU064', 'birth_date' => '2005-01-15', 'address' => '7 Main St',  'class_id' => 7],
            ['user_id' => 73, 'nom' => 'Brown',  'prenom' => 'Eva7',    'phone' => '0600000073',  'photo' => 'students/eva7.jpg',    'gender' => 'female', 'cef' => 'STU065', 'birth_date' => '2005-01-15', 'address' => '7 Main St',  'class_id' => 7],
            ['user_id' => 74, 'nom' => 'Wilson', 'prenom' => 'Frank7',  'phone' => '0600000074',  'photo' => 'students/frank7.jpg',  'gender' => 'male',   'cef' => 'STU066', 'birth_date' => '2005-01-15', 'address' => '7 Main St',  'class_id' => 7],
            ['user_id' => 75, 'nom' => 'Davis',  'prenom' => 'Grace7',  'phone' => '0600000075',  'photo' => 'students/grace7.jpg',  'gender' => 'female', 'cef' => 'STU067', 'birth_date' => '2005-01-15', 'address' => '7 Main St',  'class_id' => 7],
            ['user_id' => 76, 'nom' => 'Miller', 'prenom' => 'Henry7',  'phone' => '0600000076',  'photo' => 'students/henry7.jpg',  'gender' => 'male',   'cef' => 'STU068', 'birth_date' => '2005-01-15', 'address' => '7 Main St',  'class_id' => 7],
            ['user_id' => 77, 'nom' => 'Moore',  'prenom' => 'Ivy7',    'phone' => '0600000077',  'photo' => 'students/ivy7.jpg',    'gender' => 'female', 'cef' => 'STU069', 'birth_date' => '2005-01-15', 'address' => '7 Main St',  'class_id' => 7],
            ['user_id' => 78, 'nom' => 'Taylor', 'prenom' => 'Jack7',   'phone' => '0600000078',  'photo' => 'students/jack7.jpg',   'gender' => 'male',   'cef' => 'STU070', 'birth_date' => '2005-01-15', 'address' => '7 Main St',  'class_id' => 7],

            // Class 8
            ['user_id' => 79, 'nom' => 'Smith',  'prenom' => 'Alice8',  'phone' => '0600000079',  'photo' => 'students/alice8.jpg',  'gender' => 'female', 'cef' => 'STU071', 'birth_date' => '2005-01-15', 'address' => '8 Main St',  'class_id' => 8],
            ['user_id' => 80, 'nom' => 'Johnson','prenom' => 'Bob8',    'phone' => '0600000080',  'photo' => 'students/bob8.jpg',    'gender' => 'male',   'cef' => 'STU072', 'birth_date' => '2005-01-15', 'address' => '8 Main St',  'class_id' => 8],
            ['user_id' => 81, 'nom' => 'Lee',    'prenom' => 'Carol8',  'phone' => '0600000081',  'photo' => 'students/carol8.jpg',  'gender' => 'female', 'cef' => 'STU073', 'birth_date' => '2005-01-15', 'address' => '8 Main St',  'class_id' => 8],
            ['user_id' => 82, 'nom' => 'Kim',    'prenom' => 'David8',  'phone' => '0600000082',  'photo' => 'students/david8.jpg',  'gender' => 'male',   'cef' => 'STU074', 'birth_date' => '2005-01-15', 'address' => '8 Main St',  'class_id' => 8],
            ['user_id' => 83, 'nom' => 'Brown',  'prenom' => 'Eva8',    'phone' => '0600000083',  'photo' => 'students/eva8.jpg',    'gender' => 'female', 'cef' => 'STU075', 'birth_date' => '2005-01-15', 'address' => '8 Main St',  'class_id' => 8],
            ['user_id' => 84, 'nom' => 'Wilson', 'prenom' => 'Frank8',  'phone' => '0600000084',  'photo' => 'students/frank8.jpg',  'gender' => 'male',   'cef' => 'STU076', 'birth_date' => '2005-01-15', 'address' => '8 Main St',  'class_id' => 8],
            ['user_id' => 85, 'nom' => 'Davis',  'prenom' => 'Grace8',  'phone' => '0600000085',  'photo' => 'students/grace8.jpg',  'gender' => 'female', 'cef' => 'STU077', 'birth_date' => '2005-01-15', 'address' => '8 Main St',  'class_id' => 8],
            ['user_id' => 86, 'nom' => 'Miller', 'prenom' => 'Henry8',  'phone' => '0600000086',  'photo' => 'students/henry8.jpg',  'gender' => 'male',   'cef' => 'STU078', 'birth_date' => '2005-01-15', 'address' => '8 Main St',  'class_id' => 8],
            ['user_id' => 87, 'nom' => 'Moore',  'prenom' => 'Ivy8',    'phone' => '0600000087',  'photo' => 'students/ivy8.jpg',    'gender' => 'female', 'cef' => 'STU079', 'birth_date' => '2005-01-15', 'address' => '8 Main St',  'class_id' => 8],
            ['user_id' => 88, 'nom' => 'Taylor', 'prenom' => 'Jack8',   'phone' => '0600000088',  'photo' => 'students/jack8.jpg',   'gender' => 'male',   'cef' => 'STU080', 'birth_date' => '2005-01-15', 'address' => '8 Main St',  'class_id' => 8],

            // Class 9
            ['user_id' => 89, 'nom' => 'Smith',  'prenom' => 'Alice9',  'phone' => '0600000089',  'photo' => 'students/alice9.jpg',  'gender' => 'female', 'cef' => 'STU081', 'birth_date' => '2005-01-15', 'address' => '9 Main St',  'class_id' => 9],
            ['user_id' => 90, 'nom' => 'Johnson','prenom' => 'Bob9',    'phone' => '0600000090',  'photo' => 'students/bob9.jpg',    'gender' => 'male',   'cef' => 'STU082', 'birth_date' => '2005-01-15', 'address' => '9 Main St',  'class_id' => 9],
            ['user_id' => 91, 'nom' => 'Lee',    'prenom' => 'Carol9',  'phone' => '0600000091',  'photo' => 'students/carol9.jpg',  'gender' => 'female', 'cef' => 'STU083', 'birth_date' => '2005-01-15', 'address' => '9 Main St',  'class_id' => 9],
            ['user_id' => 92, 'nom' => 'Kim',    'prenom' => 'David9',  'phone' => '0600000092',  'photo' => 'students/david9.jpg',  'gender' => 'male',   'cef' => 'STU084', 'birth_date' => '2005-01-15', 'address' => '9 Main St',  'class_id' => 9],
            ['user_id' => 93, 'nom' => 'Brown',  'prenom' => 'Eva9',    'phone' => '0600000093',  'photo' => 'students/eva9.jpg',    'gender' => 'female', 'cef' => 'STU085', 'birth_date' => '2005-01-15', 'address' => '9 Main St',  'class_id' => 9],
            ['user_id' => 94, 'nom' => 'Wilson', 'prenom' => 'Frank9',  'phone' => '0600000094',  'photo' => 'students/frank9.jpg',  'gender' => 'male',   'cef' => 'STU086', 'birth_date' => '2005-01-15', 'address' => '9 Main St',  'class_id' => 9],
            ['user_id' => 95, 'nom' => 'Davis',  'prenom' => 'Grace9',  'phone' => '0600000095',  'photo' => 'students/grace9.jpg',  'gender' => 'female', 'cef' => 'STU087', 'birth_date' => '2005-01-15', 'address' => '9 Main St',  'class_id' => 9],
            ['user_id' => 96, 'nom' => 'Miller', 'prenom' => 'Henry9',  'phone' => '0600000096',  'photo' => 'students/henry9.jpg',  'gender' => 'male',   'cef' => 'STU088', 'birth_date' => '2005-01-15', 'address' => '9 Main St',  'class_id' => 9],
            ['user_id' => 97, 'nom' => 'Moore',  'prenom' => 'Ivy9',    'phone' => '0600000097',  'photo' => 'students/ivy9.jpg',    'gender' => 'female', 'cef' => 'STU089', 'birth_date' => '2005-01-15', 'address' => '9 Main St',  'class_id' => 9],
            ['user_id' => 98, 'nom' => 'Taylor', 'prenom' => 'Jack9',   'phone' => '0600000098',  'photo' => 'students/jack9.jpg',   'gender' => 'male',   'cef' => 'STU090', 'birth_date' => '2005-01-15', 'address' => '9 Main St',  'class_id' => 9],

            // Class 10
            ['user_id' => 99,  'nom' => 'Smith',  'prenom' => 'Alice10',  'phone' => '0600000099',  'photo' => 'students/alice10.jpg',  'gender' => 'female', 'cef' => 'STU091', 'birth_date' => '2005-01-15', 'address' => '10 Main St',  'class_id' => 10],
            ['user_id' => 100, 'nom' => 'Johnson','prenom' => 'Bob10',    'phone' => '0600000100',  'photo' => 'students/bob10.jpg',    'gender' => 'male',   'cef' => 'STU092', 'birth_date' => '2005-01-15', 'address' => '10 Main St',  'class_id' => 10],
            ['user_id' => 101, 'nom' => 'Lee',    'prenom' => 'Carol10',  'phone' => '0600000101',  'photo' => 'students/carol10.jpg',  'gender' => 'female', 'cef' => 'STU093', 'birth_date' => '2005-01-15', 'address' => '10 Main St',  'class_id' => 10],
            ['user_id' => 102, 'nom' => 'Kim',    'prenom' => 'David10',  'phone' => '0600000102',  'photo' => 'students/david10.jpg',  'gender' => 'male',   'cef' => 'STU094', 'birth_date' => '2005-01-15', 'address' => '10 Main St',  'class_id' => 10],
            ['user_id' => 103, 'nom' => 'Brown',  'prenom' => 'Eva10',    'phone' => '0600000103',  'photo' => 'students/eva10.jpg',    'gender' => 'female', 'cef' => 'STU095', 'birth_date' => '2005-01-15', 'address' => '10 Main St',  'class_id' => 10],
            ['user_id' => 104, 'nom' => 'Wilson', 'prenom' => 'Frank10',  'phone' => '0600000104',  'photo' => 'students/frank10.jpg',  'gender' => 'male',   'cef' => 'STU096', 'birth_date' => '2005-01-15', 'address' => '10 Main St',  'class_id' => 10],
            ['user_id' => 105, 'nom' => 'Davis',  'prenom' => 'Grace10',  'phone' => '0600000105',  'photo' => 'students/grace10.jpg',  'gender' => 'female', 'cef' => 'STU097', 'birth_date' => '2005-01-15', 'address' => '10 Main St',  'class_id' => 10],
            ['user_id' => 106, 'nom' => 'Miller', 'prenom' => 'Henry10',  'phone' => '0600000106',  'photo' => 'students/henry10.jpg',  'gender' => 'male',   'cef' => 'STU098', 'birth_date' => '2005-01-15', 'address' => '10 Main St',  'class_id' => 10],
            ['user_id' => 107, 'nom' => 'Moore',  'prenom' => 'Ivy10',    'phone' => '0600000107',  'photo' => 'students/ivy10.jpg',    'gender' => 'female', 'cef' => 'STU099', 'birth_date' => '2005-01-15', 'address' => '10 Main St',  'class_id' => 10],
            ['user_id' => 108, 'nom' => 'Taylor', 'prenom' => 'Jack10',   'phone' => '0600000108',  'photo' => 'students/jack10.jpg',   'gender' => 'male',   'cef' => 'STU100', 'birth_date' => '2005-01-15', 'address' => '10 Main St',  'class_id' => 10],
        ]);
        // parents
        Parents::insert([
            [
                'user_id' => 13, // parent1@example.com
                'nom' => 'Smith',
                'prenom' => 'John',
                'phone' => '0656789012',
                'photo' => 'parents/john.jpg',
                'gender' => 'male',
                'relation' => 'Father',
                'student_id' => 1,
            ],
            [
                'user_id' => 14, // parent2@example.com
                'nom' => 'Johnson',
                'prenom' => 'Mary',
                'phone' => '0667890123',
                'photo' => 'parents/mary.jpg',
                'gender' => 'female',
                'relation' => 'Mother',
                'student_id' => 2,
            ],
            [
                'user_id' => 15, // parent3@example.com
                'nom' => 'Lee',
                'prenom' => 'Sarah',
                'phone' => '0678901234',
                'photo' => 'parents/sarah.jpg',
                'gender' => 'female',
                'relation' => 'Guardian',
                'student_id' => 3,
            ],
            [
                'user_id' => 16, // parent4@example.com
                'nom' => 'Kim',
                'prenom' => 'Paul',
                'phone' => '0689012345',
                'photo' => 'parents/paul.jpg',
                'gender' => 'male',
                'relation' => 'Father',
                'student_id' => 4,
            ],
        ]);
        // Teachers
        Teacher::insert([
            [
                'user_id' => 5, // teacher1@example.com
                'nom' => 'Brown',
                'prenom' => 'Emma',
                'phone' => '0690123456',
                'photo' => 'teachers/emma.jpg',
                'gender' => 'female',

            ],
            [
                'user_id' => 6, // teacher2@example.com
                'nom' => 'Wilson',
                'prenom' => 'Liam',
                'phone' => '0601234567',
                'photo' => 'teachers/liam.jpg',
                'gender' => 'male',

            ],
            [
                'user_id' => 7, // teacher3@example.com
                'nom' => 'Davis',
                'prenom' => 'Olivia',
                'phone' => '0612345670',
                'photo' => 'teachers/olivia.jpg',
                'gender' => 'female',
            ],
            [
                'user_id' => 8, // teacher4@example.com
                'nom' => 'Miller',
                'prenom' => 'Noah',
                'phone' => '0623456701',
                'photo' => 'teachers/noah.jpg',
                'gender' => 'male',
            ],
        ]);
        // poll
        Poll::insert([
            ['name' => 'DIA'],
            ['name' => 'GC'],
            ['name' => 'THR'],
            ['name' => 'INDUS'],
            ['name' => 'AGR'],
            ['name' => 'COM'],
        ]);
        // classes
        Classes::insert([
            ['name' => 'DEV105', 'niveu' => '1',  'polls_id' => 1, 'filier' => 'DEV', 'capacite' => 30, 'teacher_id' => 1],
            ['name' => 'DEVOWFS205', 'niveu' => '2',  'polls_id' => 2, 'filier' => 'DEV', 'capacite' => 25, 'teacher_id' => 2],
            ['name' => 'IA101', 'niveu' => '1', 'polls_id' => 3, 'filier' => 'IA', 'capacite' => 20, 'teacher_id' => 3],
            ['name' => 'IAOCB201', 'niveu' => '2',  'polls_id' => 4, 'filier' => 'IA', 'capacite' => 15, 'teacher_id' => 4],
            ['name' => 'INDUS204', 'niveu' => '2',  'polls_id' => 5, 'filier' => 'INDUS', 'capacite' => 10, 'teacher_id' => 1],
            ['name' => 'AGR101', 'niveu' => '1', 'polls_id' => 6, 'filier' => 'AGR', 'capacite' => 18, 'teacher_id' => 2],
            ['name' => 'COM201', 'niveu' => '2', 'polls_id' => 1, 'filier' => 'COM', 'capacite' => 22, 'teacher_id' => 3],
            ['name' => 'GC102', 'niveu' => '1', 'polls_id' => 2, 'filier' => 'GC', 'capacite' => 28, 'teacher_id' => 4],
            ['name' => 'THR202', 'niveu' => '2', 'polls_id' => 3, 'filier' => 'THR', 'capacite' => 16, 'teacher_id' => 1],
            ['name' => 'ID103', 'niveu' => '1', 'polls_id' => 4, 'filier' => 'ID', 'capacite' => 12, 'teacher_id' => 2],
        ]);

        // Classrooms
        Classroom::insert([
            ['name' => '1A', 'capacity' => 20],
            ['name' => '2B', 'capacity' => 20],
            ['name' => '3C', 'capacity' => 20],
            ['name' => '4D', 'capacity' => 20],
            ['name' => '5E', 'capacity' => 20],
            ['name' => '6F', 'capacity' => 20],
            ['name' => '7G', 'capacity' => 20],
            ['name' => '8H', 'capacity' => 20],
            ['name' => '9I', 'capacity' => 20],
            ['name' => '10J', 'capacity' => 20],
            ['name' => '11K', 'capacity' => 20],
            ['name' => '12L', 'capacity' => 20],
            ['name' => '13M', 'capacity' => 20],
            ['name' => '14N', 'capacity' => 20],
            ['name' => '15O', 'capacity' => 20],
            ['name' => '16P', 'capacity' => 20],
            ['name' => '17Q', 'capacity' => 20],
            ['name' => '18R', 'capacity' => 20],
            ['name' => '19S', 'capacity' => 20],
            ['name' => '20T', 'capacity' => 20],
        ]);
        // Subjects
        Subject::insert([
            // Développement Digital - 1ère année (filier: DEV)
            ['code' => 'M101', 'name' => 'Se situer au regard du métier et de la démarche de formation', 'niveu' => '1', 'filier' => 'DEV', 'masse_horaire' => 20, 'done_hours' => 12, 'teacher_id' => 1, 'coificient' => 1],
            ['code' => 'M102', 'name' => 'Acquérir les bases de l’algorithmique', 'niveu' => '1', 'filier' => 'DEV', 'masse_horaire' => 60, 'done_hours' => 10, 'teacher_id' => 2, 'coificient' => 2],
            ['code' => 'M103', 'name' => 'Programmer en Orienté Objet', 'niveu' => '1', 'filier' => 'DEV', 'masse_horaire' => 60, 'done_hours' => 5, 'teacher_id' => 3, 'coificient' => 2],
            ['code' => 'M104', 'name' => 'Développer des sites web statiques', 'niveu' => '1', 'filier' => 'DEV', 'masse_horaire' => 60, 'done_hours' => 34, 'teacher_id' => 4, 'coificient' => 2],
            ['code' => 'M105', 'name' => 'Programmer en JavaScript', 'niveu' => '1', 'filier' => 'DEV', 'masse_horaire' => 60, 'done_hours' => 45, 'teacher_id' => 1, 'coificient' => 2],
            ['code' => 'M106', 'name' => 'Manipuler des bases de données', 'niveu' => '1', 'filier' => 'DEV', 'masse_horaire' => 60, 'done_hours' => 45, 'teacher_id' => 2, 'coificient' => 2],
            ['code' => 'M107', 'name' => 'Développer des sites web dynamiques', 'niveu' => '1', 'filier' => 'DEV', 'masse_horaire' => 60, 'done_hours' => 22, 'teacher_id' => 3, 'coificient' => 2],
            ['code' => 'M108', 'name' => 'S’initier à la sécurité des systèmes d’information', 'niveu' => '1', 'filier' => 'DEV', 'masse_horaire' => 30, 'done_hours' => 30, 'teacher_id' => 4, 'coificient' => 1],

            // Développement Digital - 2ème année (filier: DEV)
            ['code' => 'M201', 'name' => 'Préparation d’un projet web', 'niveu' => '2', 'filier' => 'DEV', 'masse_horaire' => 60, 'done_hours' => 60, 'teacher_id' => 1, 'coificient' => 2],
            ['code' => 'M202', 'name' => 'Approche agile', 'niveu' => '2', 'filier' => 'DEV', 'masse_horaire' => 120, 'done_hours' => 112, 'teacher_id' => 2, 'coificient' => 3],
            ['code' => 'M203', 'name' => 'Gestion des données', 'niveu' => '2', 'filier' => 'DEV', 'masse_horaire' => 90, 'done_hours' => 56, 'teacher_id' => 3, 'coificient' => 2],
            ['code' => 'M204', 'name' => 'Développement front-end', 'niveu' => '2', 'filier' => 'DEV', 'masse_horaire' => 90, 'done_hours' => 67, 'teacher_id' => 4, 'coificient' => 2],
            ['code' => 'M205', 'name' => 'Développement back-end', 'niveu' => '2', 'filier' => 'DEV', 'masse_horaire' => 120, 'done_hours' => 80, 'teacher_id' => 1, 'coificient' => 3],
            ['code' => 'M206', 'name' => 'Création d’une application Cloud native', 'niveu' => '2', 'filier' => 'DEV', 'masse_horaire' => 90, 'done_hours' => 89, 'teacher_id' => 2, 'coificient' => 2],
            ['code' => 'M207', 'name' => 'Projet de synthèse', 'niveu' => '2', 'filier' => 'DEV', 'masse_horaire' => 60, 'done_hours' => 33, 'teacher_id' => 3, 'coificient' => 2],
            ['code' => 'M208', 'name' => 'Intégration du milieu professionnel', 'niveu' => '2', 'filier' => 'DEV', 'masse_horaire' => 160, 'done_hours' => 149, 'teacher_id' => 4, 'coificient' => 4],
        ]);
        // class_subjects
        class_subject::insert([
            ['class_id' => 2, 'subject_id' => 1],
            ['class_id' => 4, 'subject_id' => 2],
            ['class_id' => 3, 'subject_id' => 7],
            ['class_id' => 3, 'subject_id' => 8],
            ['class_id' => 1, 'subject_id' => 3],
            ['class_id' => 1, 'subject_id' => 4],
            ['class_id' => 5, 'subject_id' => 5],
            ['class_id' => 5, 'subject_id' => 6],
        ]);

        // Lessons
        Lesson::insert([
            // Monday lessons
            [
            'classroom_id' => 1,
            'class_id' => 1,
            'subject_id' => 1,
            'teacher_id' => 1,
            'day' => 'Monday',
            'start_time' => '08:30',
            'end_time' => '11:00',
            ],
            [
            'classroom_id' => 2,
            'class_id' => 2,
            'subject_id' => 2,
            'teacher_id' => 2,
            'day' => 'Monday',
            'start_time' => '13:30',
            'end_time' => '16:00',
            ],
            [
            'classroom_id' => 3,
            'class_id' => 3,
            'subject_id' => 3,
            'teacher_id' => 3,
            'day' => 'Monday',
            'start_time' => '16:00',
            'end_time' => '18:30',
            ],
            [
            'classroom_id' => 4,
            'class_id' => 4,
            'subject_id' => 4,
            'teacher_id' => 4,
            'day' => 'Monday',
            'start_time' => '08:30',
            'end_time' => '11:00',
            ],
            [
            'classroom_id' => 5,
            'class_id' => 5,
            'subject_id' => 5,
            'teacher_id' => 2,
            'day' => 'Monday',
            'start_time' => '13:30',
            'end_time' => '16:00',
            ],
            [
            'classroom_id' => 6,
            'class_id' => 6,
            'subject_id' => 6,
            'teacher_id' => 2,
            'day' => 'Monday',
            'start_time' => '16:00',
            'end_time' => '18:30',
            ],
            [
            'classroom_id' => 7,
            'class_id' => 7,
            'subject_id' => 7,
            'teacher_id' => 2,
            'day' => 'Monday',
            'start_time' => '08:30',
            'end_time' => '11:00',
            ],
            [
            'classroom_id' => 8,
            'class_id' => 8,
            'subject_id' => 8,
            'teacher_id' => 3,
            'day' => 'Monday',
            'start_time' => '13:30',
            'end_time' => '16:00',
            ],
            [
            'classroom_id' => 9,
            'class_id' => 9,
            'subject_id' => 9,
            'teacher_id' => 1,
            'day' => 'Monday',
            'start_time' => '16:00',
            'end_time' => '18:30',
            ],
            [
            'classroom_id' => 10,
            'class_id' => 10,
            'subject_id' => 10,
            'teacher_id' => 4,
            'day' => 'Monday',
            'start_time' => '08:30',
            'end_time' => '11:00',
            ],

            // Tuesday lessons
            [
            'classroom_id' => 1,
            'class_id' => 1,
            'subject_id' => 11,
            'teacher_id' => 3,
            'day' => 'Tuesday',
            'start_time' => '13:30',
            'end_time' => '16:00',
            ],
            [
            'classroom_id' => 2,
            'class_id' => 2,
            'subject_id' => 12,
            'teacher_id' => 1,
            'day' => 'Tuesday',
            'start_time' => '16:00',
            'end_time' => '18:30',
            ],
            [
            'classroom_id' => 3,
            'class_id' => 3,
            'subject_id' => 13,
            'teacher_id' => 2,
            'day' => 'Tuesday',
            'start_time' => '08:30',
            'end_time' => '11:00',
            ],
            [
            'classroom_id' => 4,
            'class_id' => 4,
            'subject_id' => 14,
            'teacher_id' => 4,
            'day' => 'Tuesday',
            'start_time' => '13:30',
            'end_time' => '16:00',
            ],
            [
            'classroom_id' => 5,
            'class_id' => 5,
            'subject_id' => 15,
            'teacher_id' => 3,
            'day' => 'Tuesday',
            'start_time' => '16:00',
            'end_time' => '18:30',
            ],
        ]);

        // Exams
        Exam::insert([
            [
                'teacher_id' => 1,
                'classroom_id' => 1,
                'class_id' => 1,
                'subject_id' => 1,
                'date' => now()->addDays(5)->toDateString(),
                'start_time' => '09:00:00',
                'end_time' => '11:00:00',
                'type' => 'cc1',
                'status' => 'pending',
            ],
            [
                'teacher_id' => 2,
                'classroom_id' => 2,
                'class_id' => 2,
                'subject_id' => 2,
                'date' => now()->addDays(10)->toDateString(),
                'start_time' => '10:00:00',
                'end_time' => '12:00:00',
                'type' => 'cc2',
                'status' => 'pending',
            ],
            [
                'teacher_id' => 3,
                'classroom_id' => 3,
                'class_id' => 3,
                'subject_id' => 1,
                'date' => now()->addDays(15)->toDateString(),
                'start_time' => '13:00:00',
                'end_time' => '15:00:00',
                'type' => 'cc3',
                'status' => 'pending',
            ],
            [
                'teacher_id' => 4,
                'classroom_id' => 1,
                'class_id' => 1,
                'subject_id' => 2,
                'date' => now()->addDays(20)->toDateString(),
                'start_time' => '08:30:00',
                'end_time' => '10:30:00',
                'type' => 'EFM',
                'status' => 'pending',
            ],
        ]);

        // Results
        Result::insert([
            [
                'subject_id' => 1,
                'class_id' => 1,
                'teacher_id' => 1,
                'student_id' => 1,
                'type' => 'cc1',
                'note' => 15.5,
                'date' => now(),
            ],
            [
                'subject_id' => 2,
                'class_id' => 2,
                'teacher_id' => 2,
                'student_id' => 2,
                'type' => 'cc2',
                'note' => 12.0,
                'date' => now()->subDays(2),
            ],
            [
                'subject_id' => 1,
                'class_id' => 3,
                'teacher_id' => 3,
                'student_id' => 3,
                'type' => 'cc3',
                'note' => 18.0,
                'date' => now()->subDays(5),
            ],
            [
                'subject_id' => 2,
                'class_id' => 1,
                'teacher_id' => 4,
                'student_id' => 4,
                'type' => 'EFM',
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