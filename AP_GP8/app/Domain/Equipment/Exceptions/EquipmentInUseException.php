<?php


namespace App\Domain\Equipment\Exceptions;

class EquipmentInUseException extends EquipmentException
{
    public function __construct(string $equipment_id)
    {
        parent::__construct("Equipment {$equipment_id} is currently in use by active projects and cannot be deleted.");
    }
}