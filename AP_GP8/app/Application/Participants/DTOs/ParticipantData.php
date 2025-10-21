<?php

namespace App\Application\Participants\DTOs;

class ParticipantData
{
    public function __construct(
        public readonly string $fullName,
        public readonly string $email,
        public readonly string $affiliation,
        public readonly string $participantType,
        public readonly string $institution,
        public readonly ?string $specialization = null,
        public readonly bool $crossSkillTrained = false,
        public readonly ?string $participant_id = null
    ) {
    }

    public static function fromRequest(array $data): self
    {
        return new self(
            fullName: $data['full_name'] ?? '',
            email: $data['email'] ?? '',
            affiliation: $data['affiliation'] ?? '',
            participantType: $data['participant_type'] ?? '',
            institution: $data['institution'] ?? '',
            specialization: $data['specialization'] ?? null,
            crossSkillTrained: isset($data['cross_skill_trained']) && $data['cross_skill_trained'] ? true : false,
            participant_id: $data['participant_id'] ?? null
        );
    }

    public function toArray(): array
    {
        return [
            'participant_id' => $this->participant_id,
            'full_name' => $this->fullName,
            'email' => $this->email,
            'affiliation' => $this->affiliation,
            'specialization' => $this->specialization,
            'participant_type' => $this->participantType,
            'cross_skill_trained' => $this->crossSkillTrained,
            'institution' => $this->institution,
        ];
    }

    public function validate(): array
    {
        $errors = [];

        // Required fields validation
        if (empty(trim($this->fullName))) {
            $errors['full_name'] = 'Full name is required.';
        }

        if (empty(trim($this->email))) {
            $errors['email'] = 'Email is required.';
        } elseif (!filter_var($this->email, FILTER_VALIDATE_EMAIL)) {
            $errors['email'] = 'Email must be a valid email address.';
        }

        if (empty(trim($this->affiliation))) {
            $errors['affiliation'] = 'Affiliation is required.';
        }

        if (empty(trim($this->participantType))) {
            $errors['participant_type'] = 'Participant type is required.';
        }

        if (empty(trim($this->institution))) {
            $errors['institution'] = 'Institution is required.';
        }

        // Business rule: Cross-skill trained requires specialization
        if ($this->crossSkillTrained && empty($this->specialization)) {
            $errors['cross_skill_trained'] = 'Cross-skill flag requires Specialization.';
        }

        return $errors;
    }

    public function isValid(): bool
    {
        return empty($this->validate());
    }
}