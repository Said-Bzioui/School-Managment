<?php

namespace Database\Factories;

use App\Models\Student;
use Illuminate\Database\Eloquent\Factories\Factory;

class StudentFactory extends Factory
{
    protected $model = Student::class;

    public function definition()
    {
        return [
        'name' => $this->faker->name,
        'email' => $this->faker->unique()->safeEmail,
        'age' => $this->faker->numberBetween(18, 30),
        'user_id' => $this->faker->randomNumber(),
        'student_code' => $this->faker->unique()->regexify('[A-Z]{5}[0-9]{3}'),
        'birth_date' => $this->faker->date(),
        'address' => $this->faker->address,
        'class_id' => $this->faker->randomNumber(),
        ];
    }
}