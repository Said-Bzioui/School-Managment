<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('results', function (Blueprint $table) {
            $table->id();

            $table->foreignId('subject_id')
                ->constrained()
                ->onDelete('cascade');

            $table->foreignId('class_id')
                ->constrained()
                ->onDelete('cascade');

            $table->foreignId('teacher_id')
                ->constrained()
                ->onDelete('cascade');

            $table->foreignId('student_id')
                ->constrained()
                ->onDelete('cascade');

            $table->enum('type', ['examen', 'controle', 'devoir'])->default('examen');

            $table->float('note')->nullable(); 

            $table->date('date');

            $table->timestamps();
        });
    }




    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('results');
    }
};