Notes:

Components that subscribe to the auth service:
Auth, Home, Footer

LobbyComponent and MatchComponent will have unique generated IDs that display in the route path. Implement auth guard so that only users assigned to a lobby/match can access them

Roles:

Town (Investigative Protective Government Killing Power)

Bodyguard Bus Driver Citizen Coroner Crier Detective Doctor Escort Investigator Jailor Lookout Marshall Mason Mason Leader Mayor Sheriff Spy Stump Veteran Vigilante

Mafia (Deception Killing Support)

Agent Beguiler Blackmailer Consigliere Consort Disguiser Framer Godfather Janitor Kidnapper Mafioso

Triad (Deception Killing Support)

Administrator Deceiver Dragon Head Enforcer Forger Incense Master Informant Interrogator Liaison Silencer Vanguard

Neutral (Benign Evil Killing)

Amnesiac Arsonist Auditor Cultist Executioner Jester Judge Mass Murderer Scumbag Serial Killer Survivor Witch Witch Doctor

ROLE IDEAS:
- Wizard: At night, transform a player into a random role. This can only be used once.

  #isExcludedFromRandomAny = false;
  #isExcludedFromRandomTown = false;
  #isExcludedFromRandomMafia = false;
  #isExcludedFromRandomTriad = false;
  #isExcludedFromRandomNeutral = false;

  #isExcludedFromMafiaRandom = false;
  #isExcludedFromMafiaSupport = false;
  #isExcludedFromMafiaKilling = false;
  #isExcludedFromMafiaDeception =  false;

  #isExcludedFromTriadRandom = false;
  #isExcludedFromTriadSupport = false;
  #isExcludedFromTriadKilling = false;
  #isExcludedFromTriadDeception =  false;

  #isExcludedFromTownRandom = false;
  #isExcludedFromTownGovernment = false;
  #isExcludedFromTownInvestigative = false;
  #isExcludedFromTownKilling = false;
  #isExcludedFromTownPower = false;
  #isExcludedFromTownProtective = false;

  #isExcludedFromNeutralRandom = false;
  #isExcludedFromNeutralBenign = false;
  #isExcludedFromNeutralEvil = false;
  #isExcludedFromNeutralKilling = false;
