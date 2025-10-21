<?php

namespace App\Http\Requests\Programs;

use Illuminate\Foundation\Http\FormRequest;

class ProgramRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     */
    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'description' => ['required', 'string'],
            'program_code' => ['nullable', 'string', 'max:50'],
            'focus_areas' => ['nullable', 'string'],
            'national_alignment' => ['nullable', 'string'],
            'phases' => ['nullable', 'string'],
        ];
    }

    /**
     * Get custom error messages for validation rules.
     */
    public function messages(): array
    {
        return [
            'name.required' => 'Program name is required.',
            'name.max' => 'Program name cannot exceed 255 characters.',
            'description.required' => 'Program description is required.',
            'program_code.max' => 'Program code cannot exceed 50 characters.',
        ];
    }
}