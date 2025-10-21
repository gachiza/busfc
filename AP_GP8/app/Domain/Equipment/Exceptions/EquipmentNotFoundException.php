<?php


namespace App\Domain\Equipment\Exceptions;


class EquipmentNotFoundException extends EquipmentException
{
    public function __construct(string $equipment_id)
    {
        parent::__construct("Equipment with ID {$equipment_id} not found.");
    }
}