<?php


namespace App\Domain\Equipment\Exceptions;

class DuplicateInventoryCodeException extends EquipmentException
{
    public function __construct(string $inventory_code)
    {
        parent::__construct("Equipment with inventory code {$inventory_code} already exists.");
    }
}