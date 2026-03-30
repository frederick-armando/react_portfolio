import { TOTAL_PROJECTS } from '../../data/site.js';

export const projectsPageContent = {
  fr: {
    sectionLabel: 'Études de cas',
    stageLabel: 'Aperçus des projets',
    openProjectLabel: (title) => `Ouvrir le projet ${title}`,
    tagsLabel: 'Type de projet',
    summaryLabel: 'Nombre total de projets',
    summaryText: `${TOTAL_PROJECTS} projets au total`,
    pagerLabel: 'Navigation du carrousel',
    previousLabel: 'Projet précédent',
    nextLabel: 'Projet suivant',
    pauseLabel: 'Mettre le défilement automatique en pause',
    resumeLabel: 'Relancer le défilement automatique',
  },
  en: {
    sectionLabel: 'Case studies',
    stageLabel: 'Project previews',
    openProjectLabel: (title) => `Open project ${title}`,
    tagsLabel: 'Project type',
    summaryLabel: 'Total number of projects',
    summaryText: `${TOTAL_PROJECTS} projects total`,
    pagerLabel: 'Carousel navigation',
    previousLabel: 'Previous project',
    nextLabel: 'Next project',
    pauseLabel: 'Pause autoplay',
    resumeLabel: 'Resume autoplay',
  },
};
