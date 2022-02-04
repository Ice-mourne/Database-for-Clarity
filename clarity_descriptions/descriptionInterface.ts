export interface ClarityDescription {
   armorExotic:  { [key: string]: ArmorExotic };
   armorMods:    { [key: string]: ModsPerks   };
   weaponPerks:  { [key: string]: ModsPerks   };
   weaponFrames: { [key: string]: ModsPerks   };
   weaponMods:   { [key: string]: ModsPerks   };
}

export interface ArmorExotic {
   name:        string;
   id:          string;
   itemName:    string;
   itemId:      string;
   description: Description[];
   lastUpdate:  string;
}

export interface ModsPerks {
   name:        string;
   id:          string;
   description: Description[];
   stats?:      Stats;
   lastUpdate:  string;
   rarity:      string; //? maybe define possible values
}

export interface Description {
   lineText?:  LineText[]
   className?: string
   table?:     Table[]
}

export interface Table {
   lineText:   LineText[]
   className?: string
}

export interface LineText {
   text?:        string
   className?:   string
   formulaText?: string
   formula?:     string
   title?:       string
   linkText?:    string
   linkUrl?:     string
}

export interface Stats {
   handling?:     ActivePassive;
   damage?:       ActivePassive;
   range?:        ActivePassive;
   chargeDraw?:   ActivePassive;
   reload?:       ActivePassive;
   stability?:    ActivePassive;
   aimAssist?:    ActivePassive;
   magazineSize?: ActivePassive;
   zoom?:         ActivePassive;
   duration?:     number[];
}

export interface ActivePassive {
   active?:  StatMultiplier;
   passive?: StatMultiplier;
}

export interface StatMultiplier {
   stat?:       number[];
   multiplier?: number[];
}
