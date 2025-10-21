<?php


namespace App\Domain\Equipment\Exceptions;

class InvalidEquipmentDataException extends EquipmentException
{
    public function __construct(string $message)
    {
        parent::__construct("Invalid equipment data: {$message}");
    }
}