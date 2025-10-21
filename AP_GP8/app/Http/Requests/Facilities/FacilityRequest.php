<?php

namespace App\Http\Requests\Facilities;

use Illuminate\Foundation\Http\FormRequest;

class FacilityRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Prepare the data for validation.
     */
    protected function prepareForValidation()
    {
        if ($this->has('capabilities') && is_string($this->capabilities)) {
            $this->merge([
                'capabilities' => array_filter(
                    array_map('trim', explode(',', $this->capabilities))
                )
            ]);
        }
    }

    /**
     * Get the validation rules that apply to the request.
     */
    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'location' => ['required', 'string', 'max:255'],
            'facility_type' => ['required', 'string', 'max:255'],
            'capabilities' => ['nullable', 'array'],
            'capabilities.*' => ['nullable','string'],
        ];
    }

    /**
     * Get custom messages for validator errors.
     */
    public function messages(): array
    {
        return [
            'name.required' => 'Facility name is required.',
            'location.required' => 'Facility location is required.',
            'facility_type.required' => 'Facility type is required.',
            'capabilities.array' => 'Capabilities must be an array.',
        ];
    }
}