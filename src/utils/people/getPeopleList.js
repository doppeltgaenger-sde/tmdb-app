import { getPeopleMediaList } from "@utils";

export const getPeopleList = (peopleList) => {
  if (!peopleList) return [];

  return peopleList.map((item) => {
    return {
      id: item.id,
      name: item.name || item.original_name,
      profilePath: item.profile_path,
      mediaList: getPeopleMediaList(item.known_for) || [],
    };
  });
};