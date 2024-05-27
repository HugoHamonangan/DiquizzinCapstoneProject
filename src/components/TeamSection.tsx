import React from 'react';
import { useAppSelector } from '../states/hooks/hooks';
import { translate } from '../utils/helperFunction';
import Card from './Card';
import ScrollReveal from './ScrollReveal';
import hugo from '../img/hugo.png';
import gimnastiar from '../img/gimnastiar.png';
import johan from '../img/johan.png';

const teamMembers = [
  {
    img: hugo,
    name: 'Hugo Hamonangan',
    explanationEn:
      'Responsible for making design, frontend, and helping backend of this website application.',
    explanationId:
      'Bertanggung jawab untuk membuat desain, frontend, dan membantu backend dari aplikasi situs web ini.',
    instagramUser: 'hugo_hamonangan',
    facebookUser: 'hugo.hamonangan.11',
    githubUser: 'HugoHamonangan',
    youtubeUser: '@hugohamonangan9639',
  },
  {
    img: gimnastiar,
    name: 'Muh. Gimnastiar Idris',
    explanationEn:
      'Responsible for making design and helping to develop this website application.',
    explanationId:
      'Bertanggung jawab untuk membuat desain dan membantu pengembangan aplikasi dari aplikasi situs web ini.',
    instagramUser: 'gimnastiar_idris',
    facebookUser: 'gimnastiar.idris',
    githubUser: 'GimnastiarIdris',
    youtubeUser: '@gimnastiaridris',
  },
  {
    img: johan,
    name: 'Johan Sitanggang',
    explanationEn:
      'Responsible for making Backend, Authentication and API of this website application.',
    explanationId:
      'Bertanggung jawab untuk membuat dan mengintegrasi Backend, autentikasi dan serta API dari aplikasi situs web ini.',
    instagramUser: 'johan_sitanggang',
    facebookUser: 'johan.sitanggang',
    githubUser: 'JohanSitanggang',
    youtubeUser: '@johansitanggang',
  },
];

const TeamSection: React.FC = () => {
  const language = useAppSelector((state) => state.language);

  return (
    <section className="container mx-auto px-10 md:px-0 pt-[7rem]">
      <ScrollReveal>
        <h3 className="text-[#0C356A] text-center font-extrabold text-xl mb-10">
          {translate(language, 'Meet Our Team', 'Tim Kami')}
        </h3>
        <h1 className="font-extrabold text-center text-3xl md:w-[40rem] mx-auto mb-[5rem]">
          {translate(
            language,
            'We Are students from Dicoding Academy MSIB Batch 6',
            'Kami adalah siswa dari Dicoding Academy MSIB Batch 6'
          )}
        </h1>
      </ScrollReveal>
      <div className="flex flex-wrap justify-center gap-8 items-center ">
        {teamMembers.map((member) => (
          <ScrollReveal key={member.name} className="w-fit sm:w-auto">
            <Card
              img={member.img}
              name={member.name}
              explanation={translate(
                language,
                member.explanationEn,
                member.explanationId
              )}
              instagramUser={member.instagramUser}
              facebookUser={member.facebookUser}
              githubUser={member.githubUser}
              youtubeUser={member.youtubeUser}
            />
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
};

export default TeamSection;
