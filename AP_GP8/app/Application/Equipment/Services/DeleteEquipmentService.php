<?php

namespace App\Application\Equipment\Services;

use App\Domain\Equipment\Repositories\EquipmentRepositoryInterface;

class DeleteEquipmentService
{
    public function __construct(private readonly EquipmentRepositoryInterface $repo)
    {
    }

    public function execute(string $equipmentId): bool
    {
        $equipment = $this->repo->findById($equipmentId);
        if (!$equipment) {
            throw new \Exception('Equipment not found');
        }

        if ($this->repo->hasActiveProjects($equipmentId)) {
            throw new \Exception('Equipmentreferencedbyactive Project.');
        }

        return $this->repo->delete($equipmentId);
    }
}
