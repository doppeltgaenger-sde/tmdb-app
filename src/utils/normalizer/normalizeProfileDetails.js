import { 
  getProfileLibrary,
  formatSocials,
  getProfileBirthDate,
  getProfileDeathDate,
} from "@utils";

export const normalizeCriticalProfileDetails = ({ details: item }) => {
  console.log(item );
  
  return {
    name: item.name || item.also_known_as,

    biography: item.biography 
      ? item.biography.split("\n\n").filter(p => p.trim() !== "") 
      : ["No biography has been added."],

    profilePath: item.profile_path,
    library: getProfileLibrary(item.combined_credits?.cast || [])
  };
};

export const normalizeContextProfileDetails = ({ details: item }) => {
  const combinedCredits = item.combined_credits;
  const birthDate = item.birthday;
  const deathDate = item.deathday;

  return {
    socials: formatSocials(item.external_ids, item.homepage),
    department: item.known_for_department || "–",
    totalCredits: combinedCredits?.cast.length + combinedCredits?.crew.length,
    birthday: getProfileBirthDate(birthDate, deathDate),
    deathday: getProfileDeathDate(deathDate, birthDate),
    birthPlace: item.place_of_birth || "–",
    aliases: item.also_known_as || item.name,
  };
}
