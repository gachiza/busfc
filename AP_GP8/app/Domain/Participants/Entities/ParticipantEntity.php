<?php

namespace App\Domain\Participants\Entities;

class ParticipantEntity
{
    private ?string $participant_id;
    private string $fullName;
    private string $email;
    private string $affiliation;
    private ?string $specialization;
    private string $participantType;
    private bool $crossSkillTrained;
    private string $institution;
    private ?\DateTimeInterface $createdAt;
    private ?\DateTimeInterface $updatedAt;

    public function __construct(
        string $fullName,
        string $email,
        string $affiliation,
        string $participantType,
        string $institution,
        ?string $specialization = null,
        bool $crossSkillTrained = false,
        ?string $participant_id = null,
        ?\DateTimeInterface $createdAt = null,
        ?\DateTimeInterface $updatedAt = null
    ) {
        $this->fullName = $fullName;
        $this->email = $email;
        $this->affiliation = $affiliation;
        $this->participantType = $participantType;
        $this->institution = $institution;
        $this->specialization = $specialization;
        $this->crossSkillTrained = $crossSkillTrained;
        $this->participant_id = $participant_id;
        $this->createdAt = $createdAt;
        $this->updatedAt = $updatedAt;
    }

    // Getters
    public function getParticipantId(): ?string
    {
        return $this->participant_id;
    }

    public function getFullName(): string
    {
        return $this->fullName;
    }

    // Backward-compatible alias used by older views
    public function getName(): string
    {
        return $this->getFullName();
    }

    // Backward-compatible alias for id
    public function getId(): ?string
    {
        return $this->getParticipantId();
    }

    public function getEmail(): string
    {
        return $this->email;
    }

    public function getAffiliation(): string
    {
        return $this->affiliation;
    }

    public function getSpecialization(): ?string
    {
        return $this->specialization;
    }

    public function getParticipantType(): string
    {
        return $this->participantType;
    }

    public function getCrossSkillTrained(): bool
    {
        return $this->crossSkillTrained;
    }

    public function getInstitution(): string
    {
        return $this->institution;
    }

    public function getCreatedAt(): ?\DateTimeInterface
    {
        return $this->createdAt;
    }

    public function getUpdatedAt(): ?\DateTimeInterface
    {
        return $this->updatedAt;
    }

    // Setters
    public function setFullName(string $fullName): void
    {
        $this->fullName = $fullName;
    }

    public function setEmail(string $email): void
    {
        $this->email = $email;
    }

    public function setAffiliation(string $affiliation): void
    {
        $this->affiliation = $affiliation;
    }

    public function setSpecialization(?string $specialization): void
    {
        $this->specialization = $specialization;
    }

    public function setParticipantType(string $participantType): void
    {
        $this->participantType = $participantType;
    }

    public function setCrossSkillTrained(bool $crossSkillTrained): void
    {
        $this->crossSkillTrained = $crossSkillTrained;
    }

    public function setInstitution(string $institution): void
    {
        $this->institution = $institution;
    }

    // Business logic helpers
    public function hasSpecialization(): bool
    {
        return !empty($this->specialization);
    }

    public function isCrossSkillTrained(): bool
    {
        return $this->crossSkillTrained;
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
            'created_at' => $this->createdAt?->format('Y-m-d H:i:s'),
            'updated_at' => $this->updatedAt?->format('Y-m-d H:i:s'),
        ];
    }

    public static function fromArray(array $data): self
    {
        return new self(
            $data['full_name'] ?? '',
            $data['email'] ?? '',
            $data['affiliation'] ?? '',
            $data['participant_type'] ?? '',
            $data['institution'] ?? '',
            $data['specialization'] ?? null,
            $data['cross_skill_trained'] ?? false,
            $data['participant_id'] ?? null,
            isset($data['created_at']) ? new \DateTime($data['created_at']) : null,
            isset($data['updated_at']) ? new \DateTime($data['updated_at']) : null
        );
    }
}