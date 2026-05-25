import { getPeopleList } from "@utils";

export const normalizePeopleData = ({ data }) => {
  return {
    peopleList: getPeopleList(data?.peopleList) || [],
    totalPages: data?.totalPages || 0,
  };
};