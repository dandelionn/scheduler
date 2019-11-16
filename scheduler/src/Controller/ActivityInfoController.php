<?php

namespace App\Controller;

use App\Entity\ActivityInfo;
use App\Form\ActivityInfoType;
use App\Repository\ActivityInfoRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route("/activity/info")
 */
class ActivityInfoController extends AbstractController
{
    /**
     * @Route("/", name="activity_info_index", methods={"GET"})
     */
    public function index(ActivityInfoRepository $activityInfoRepository): Response
    {
        return $this->render('activity_info/index.html.twig', [
            'activity_infos' => $activityInfoRepository->findAll(),
        ]);
    }

    /**
     * @Route("/new", name="activity_info_new", methods={"GET","POST"})
     */
    public function new(Request $request): Response
    {
        $activityInfo = new ActivityInfo();
        $form = $this->createForm(ActivityInfoType::class, $activityInfo);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $entityManager = $this->getDoctrine()->getManager();
            $entityManager->persist($activityInfo);
            $entityManager->flush();

            return $this->redirectToRoute('activity_info_index');
        }

        return $this->render('activity_info/new.html.twig', [
            'activity_info' => $activityInfo,
            'form' => $form->createView(),
        ]);
    }

    /**
     * @Route("/{id}", name="activity_info_show", methods={"GET"})
     */
    public function show(ActivityInfo $activityInfo): Response
    {
        return $this->render('activity_info/show.html.twig', [
            'activity_info' => $activityInfo,
        ]);
    }

    /**
     * @Route("/{id}/edit", name="activity_info_edit", methods={"GET","POST"})
     */
    public function edit(Request $request, ActivityInfo $activityInfo): Response
    {
        $form = $this->createForm(ActivityInfoType::class, $activityInfo);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $this->getDoctrine()->getManager()->flush();

            return $this->redirectToRoute('activity_info_index');
        }

        return $this->render('activity_info/edit.html.twig', [
            'activity_info' => $activityInfo,
            'form' => $form->createView(),
        ]);
    }

    /**
     * @Route("/{id}", name="activity_info_delete", methods={"DELETE"})
     */
    public function delete(Request $request, ActivityInfo $activityInfo): Response
    {
        if ($this->isCsrfTokenValid('delete'.$activityInfo->getId(), $request->request->get('_token'))) {
            $entityManager = $this->getDoctrine()->getManager();
            $entityManager->remove($activityInfo);
            $entityManager->flush();
        }

        return $this->redirectToRoute('activity_info_index');
    }
}
