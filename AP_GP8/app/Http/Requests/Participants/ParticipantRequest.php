<?php

namespace App\Http\Requests\Participants;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use App\Models\Participant;

class ParticipantRequest extends FormRequest
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
        $participantId = $this->route('participant_id');

        return [
            'full_name' => ['required', 'string', 'max:255'],
            'email' => [
                'required',
                'email',
                'max:255',
                Rule::unique('participants', 'email')
                    ->ignore($participantId, 'participant_id')
                    ->where(function ($query) {
                    return $query->whereRaw('LOWER(email) = ?', [strtolower($this->email)]);
                })
            ],
            'affiliation' => ['required', 'string', Rule::in(Participant::AFFILIATIONS)],
            'specialization' => ['nullable', 'string', Rule::in(Participant::SPECIALIZATIONS)],
            'participant_type' => ['required', 'string', Rule::in(Participant::PARTICIPANT_TYPES)],
            'institution' => ['required', 'string', Rule::in(Participant::INSTITUTIONS)],
            'cross_skill_trained' => ['nullable', 'boolean'],
        ];
    }

    /**
     * Configure the validator instance.
     */
    public function withValidator($validator)
    {
        $validator->after(function ($validator) {
            // Business rule: Cross-skill trained requires specialization
            if ($this->cross_skill_trained && empty($this->specialization)) {
                $validator->errors()->add(
                    'cross_skill_trained',
                    'Cross-skill flag requires Specialization.'
                );
            }
        });
    }

    /**
     * Get custom messages for validator errors.
     */
    public function messages(): array
    {
        return [
            'full_name.required' => 'Full name is required.',
            'email.required' => 'Email is required.',
            'email.unique' => 'Participant.Email already exists.',
            'affiliation.required' => 'Affiliation is required.',
            'participant_type.required' => 'Participant type is required.',
            'institution.required' => 'Institution is required.',
        ];
    }
}