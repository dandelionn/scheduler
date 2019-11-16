<?php

namespace App\Repository;

use App\Entity\ActivityInfo;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Common\Persistence\ManagerRegistry;

/**
 * @method ActivityInfo|null find($id, $lockMode = null, $lockVersion = null)
 * @method ActivityInfo|null findOneBy(array $criteria, array $orderBy = null)
 * @method ActivityInfo[]    findAll()
 * @method ActivityInfo[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class ActivityInfoRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, ActivityInfo::class);
    }

    // /**
    //  * @return ActivityInfo[] Returns an array of ActivityInfo objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('a')
            ->andWhere('a.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('a.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?ActivityInfo
    {
        return $this->createQueryBuilder('a')
            ->andWhere('a.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
