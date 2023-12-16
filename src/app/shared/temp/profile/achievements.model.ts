interface Achievement {
  title: string;
  desc: string;
  weight: number;
  hidden: boolean;
  complete?: boolean;
}



export class Achievements {
  achievements: Achievement[] = [
    { title: 'Newbie',
      desc: 'Play your first game.',
      weight: 100,
      hidden: false
    },
    { title: 'Survivor',
      desc: 'Survive until the game ends.',
      weight: 100,
      hidden: false
    },
    { title: 'Town Win!',
      desc: 'Win as Town.',
      weight: 100,
      hidden: false
    },
    { title: 'Mafia Win!',
      desc: 'Win as Mafia.',
      weight: 100,
      hidden: false
    }
  ]
}
