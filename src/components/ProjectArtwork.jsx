import { useLanguage } from '../i18n/LanguageContext.jsx';

import chatbotBg from '../assets/projects/Chatbot-bg.png';
import chatbotDevice from '../assets/projects/Chatbot.png';
import chatbotDevice2x from '../assets/projects/Chatbot@2x.png';
import chatbotDevice3x from '../assets/projects/Chatbot@3x.png';

import myxpertBg from '../assets/projects/MyXpert-bg.png';
import myxpertDevice from '../assets/projects/MyXpert.png';
import myxpertDevice2x from '../assets/projects/MyXpert@2x.png';
import myxpertDevice3x from '../assets/projects/MyXpert@3x.png';
import masteosBg from '../assets/projects/masteos-bg.png';
import masteosDevice from '../assets/projects/Masteos.png';
import masteosDevice2x from '../assets/projects/Masteos@2x.png';
import masteosDevice3x from '../assets/projects/Masteos@3x.png';

import heliosBg from '../assets/projects/helios-bg.png';
import heliosDevice from '../assets/projects/Helios.png';
import heliosDevice2x from '../assets/projects/Helios@2x.png';
import heliosDevice3x from '../assets/projects/Helios@3x.png';

import kirrkBg from '../assets/projects/kirrk-bg.png';
import kirrkDevice from '../assets/projects/Kirrk.png';
import kirrkDevice2x from '../assets/projects/Kirrk@2x.png';
import kirrkDevice3x from '../assets/projects/Kirrk@3x.png';

import mobioosBg from '../assets/projects/mobioos-bg.png';
import mobioosDevice from '../assets/projects/Mobioos.png';
import mobioosDevice2x from '../assets/projects/Mobioos@2x.png';
import mobioosDevice3x from '../assets/projects/Mobioos@3x.png';

import comingSoonBg from '../assets/projects/bg-last.png';

const artworkAssets = {
  'tire-assistant': {
    bg: heliosBg,
    src: chatbotDevice,
    srcSet: `${chatbotDevice2x} 2x, ${chatbotDevice3x} 3x`,
  },
  myxpert: {
    bg: masteosBg,
    src: myxpertDevice,
    srcSet: `${myxpertDevice2x} 2x, ${myxpertDevice3x} 3x`,
  },
  masteos: {
    bg: chatbotBg,
    src: masteosDevice,
    srcSet: `${masteosDevice2x} 2x, ${masteosDevice3x} 3x`,
  },
  helios: {
    bg: mobioosBg,
    src: heliosDevice,
    srcSet: `${heliosDevice2x} 2x, ${heliosDevice3x} 3x`,
  },
  kirrk: {
    bg: kirrkBg,
    src: kirrkDevice,
    srcSet: `${kirrkDevice2x} 2x, ${kirrkDevice3x} 3x`,
  },
  mobioos: {
    bg: myxpertBg,
    bgStyle: {  },
    src: mobioosDevice,
    srcSet: `${mobioosDevice2x} 2x, ${mobioosDevice3x} 3x`,
  },
};

export default function ProjectArtwork({ project, mode = 'main' }) {
  const assets = artworkAssets[project.preview];

  if (!assets) {
    return (
      <div className="project-artwork">
        <img
          className="project-artwork__bg"
          src={comingSoonBg}
          alt=""
          draggable="false"
          loading="lazy"
          decoding="async"
        />
        <div className={`project-artwork__canvas project-artwork__canvas--coming-soon project-artwork--${mode}`} aria-hidden="true">
          <div className="project-soon">
            <p>Coming</p>
            <p>Soon</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="project-artwork">
      <img
        className="project-artwork__bg"
        src={assets.bg}
        alt=""
        draggable="false"
        style={assets.bgStyle}
        loading="lazy"
        decoding="async"
      />
      <div className={`project-artwork__canvas project-artwork__canvas--${project.preview} project-artwork--${mode}`} aria-hidden="true">
        <img
          className="project-artwork__device"
          src={assets.src}
          srcSet={assets.srcSet || undefined}
          alt=""
          draggable="false"
          loading="lazy"
          decoding="async"
        />
      </div>
    </div>
  );
}
