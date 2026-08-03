import chatbotBg from '../assets/projects/Chatbot-bg.png';
import chatbotDevice from '../assets/projects/Chatbot (update 2).png';
import chatbotDevice2x from '../assets/projects/Chatbot (update 2)@2x.png';
import chatbotBgWebp from '../assets/projects/Chatbot-bg.webp';
import chatbotDeviceWebp from '../assets/projects/Chatbot (update 2).webp';
import chatbotDevice2xWebp from '../assets/projects/Chatbot (update 2)@2x.webp';

import myxpertBg from '../assets/projects/MyXpert-bg.png';
import myxpertDevice from '../assets/projects/MyXpert.png';
import myxpertDevice2x from '../assets/projects/MyXpert@2x.png';
import myxpertBgWebp from '../assets/projects/MyXpert-bg.webp';
import myxpertDeviceWebp from '../assets/projects/MyXpert.webp';
import myxpertDevice2xWebp from '../assets/projects/MyXpert@2x.webp';

import masteosBg from '../assets/projects/masteos-bg.png';
import masteosDevice from '../assets/projects/Masteos.png';
import masteosDevice2x from '../assets/projects/Masteos@2x.png';
import masteosBgWebp from '../assets/projects/masteos-bg.webp';
import masteosDeviceWebp from '../assets/projects/Masteos.webp';
import masteosDevice2xWebp from '../assets/projects/Masteos@2x.webp';

import heliosBg from '../assets/projects/helios-bg.png';
import heliosDevice from '../assets/projects/Helios.png';
import heliosDevice2x from '../assets/projects/Helios@2x.png';
import heliosBgWebp from '../assets/projects/helios-bg.webp';
import heliosDeviceWebp from '../assets/projects/Helios.webp';
import heliosDevice2xWebp from '../assets/projects/Helios@2x.webp';

import kirrkBg from '../assets/projects/kirrk-bg.png';
import kirrkDevice from '../assets/projects/Kirrk.png';
import kirrkDevice2x from '../assets/projects/Kirrk@2x.png';
import kirrkBgWebp from '../assets/projects/kirrk-bg.webp';
import kirrkDeviceWebp from '../assets/projects/Kirrk.webp';
import kirrkDevice2xWebp from '../assets/projects/Kirrk@2x.webp';

import mobioosBg from '../assets/projects/mobioos-bg.png';
import mobioosDevice from '../assets/projects/Mobioos.png';
import mobioosDevice2x from '../assets/projects/Mobioos@2x.png';
import mobioosBgWebp from '../assets/projects/mobioos-bg.webp';
import mobioosDeviceWebp from '../assets/projects/Mobioos.webp';
import mobioosDevice2xWebp from '../assets/projects/Mobioos@2x.webp';

import comingSoonBg from '../assets/projects/bg-last.png';
import comingSoonBgWebp from '../assets/projects/bg-last.webp';
import { SkeletonImage } from './Skeleton.jsx';

const artworkAssets = {
  'tire-assistant': {
    bg: heliosBg,
    bgWebp: heliosBgWebp,
    src: chatbotDevice,
    srcWebp: chatbotDeviceWebp,
    srcSet: `${chatbotDevice2x} 2x`,
    webpSrcSet: `${chatbotDevice2xWebp} 2x`,
  },
  myxpert: {
    bg: masteosBg,
    bgWebp: masteosBgWebp,
    src: myxpertDevice,
    srcWebp: myxpertDeviceWebp,
    srcSet: `${myxpertDevice2x} 2x`,
    webpSrcSet: `${myxpertDevice2xWebp} 2x`,
  },
  masteos: {
    bg: chatbotBg,
    bgWebp: chatbotBgWebp,
    src: masteosDevice,
    srcWebp: masteosDeviceWebp,
    srcSet: `${masteosDevice2x} 2x`,
    webpSrcSet: `${masteosDevice2xWebp} 2x`,
  },
  helios: {
    bg: mobioosBg,
    bgWebp: mobioosBgWebp,
    src: heliosDevice,
    srcWebp: heliosDeviceWebp,
    srcSet: `${heliosDevice2x} 2x`,
    webpSrcSet: `${heliosDevice2xWebp} 2x`,
  },
  kirrk: {
    bg: kirrkBg,
    bgWebp: kirrkBgWebp,
    src: kirrkDevice,
    srcWebp: kirrkDeviceWebp,
    srcSet: `${kirrkDevice2x} 2x`,
    webpSrcSet: `${kirrkDevice2xWebp} 2x`,
  },
  mobioos: {
    bg: myxpertBg,
    bgWebp: myxpertBgWebp,
    bgStyle: {},
    src: mobioosDevice,
    srcWebp: mobioosDeviceWebp,
    srcSet: `${mobioosDevice2x} 2x`,
    webpSrcSet: `${mobioosDevice2xWebp} 2x`,
  },
};

export default function ProjectArtwork({ project, mode = 'main' }) {
  const assets = artworkAssets[project.preview];
  const isPriority = mode === 'main' || mode === 'detail';
  const loading = isPriority ? 'eager' : 'lazy';
  const fetchPriority = isPriority ? 'high' : 'auto';

  if (!assets) {
    return (
      <div className="project-artwork">
        <SkeletonImage
          wrapperClassName="project-artwork__bg-wrap"
          className="project-artwork__bg"
          src={comingSoonBg}
          webpSrc={comingSoonBgWebp}
          alt=""
          draggable="false"
          loading={loading}
          fetchPriority={fetchPriority}
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
      <SkeletonImage
        wrapperClassName="project-artwork__bg-wrap"
        className="project-artwork__bg"
        src={assets.bg}
        webpSrc={assets.bgWebp}
        alt=""
        draggable="false"
        imgStyle={assets.bgStyle}
        loading={loading}
        fetchPriority={fetchPriority}
        decoding="async"
      />
      <div className={`project-artwork__canvas project-artwork__canvas--${project.preview} project-artwork--${mode}`} aria-hidden="true">
        <SkeletonImage
          wrapperClassName="project-artwork__device-wrap"
          className="project-artwork__device"
          src={assets.src}
          srcSet={assets.srcSet || undefined}
          webpSrc={assets.srcWebp}
          webpSrcSet={assets.webpSrcSet || undefined}
          alt=""
          draggable="false"
          loading={loading}
          fetchPriority={fetchPriority}
          decoding="async"
        />
      </div>
    </div>
  );
}
