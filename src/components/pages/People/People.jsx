import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { fetchPeople } from "@thunk";
import { Pagination, Loader } from "@shared";
import { PeopleList } from "./components";
import "./styles/People.scss";

const MIN_LOADING_TIME = 400;

export const People = () => {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  const pageState = useSelector(
    (state) => state.people.people?.[currentPage]
  );

  const data = pageState?.data; 
  const isInitialLoading = !pageState || pageState.loading;
  const pageLoading = pageState?.pageLoading || false;
  const error = pageState?.error;
  const [bufferedPeopleList, setBufferedPeopleList] = useState([]);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const loadingStartTimeRef = useRef(null);
  const totalPagesRef = useRef(0);

  if (data?.totalPages) {
    totalPagesRef.current = data.totalPages;
  }

  useEffect(() => {
    setIsFadingOut(true);
    loadingStartTimeRef.current = Date.now();
  }, [currentPage]);

  useEffect(() => {
    if (pageLoading) return;

    if (isFadingOut && data?.peopleList) {
      const timePassed = Date.now() - loadingStartTimeRef.current;
      const remainingTime = Math.max(0, MIN_LOADING_TIME - timePassed);

      const timeoutId = setTimeout(() => {
        setBufferedPeopleList(data.peopleList);
        
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            setIsFadingOut(false);
          });
        });
      }, remainingTime);

      return () => clearTimeout(timeoutId);
    } 
    
    if (!pageLoading && !isFadingOut && data?.peopleList) {
      setBufferedPeopleList(data.peopleList);
    }
  }, [pageLoading, isFadingOut, data?.peopleList]);

  useEffect(() => {
    dispatch(fetchPeople({ page: currentPage }));
  }, [dispatch, currentPage]);

  const handlePageChange = (newPage) => {
    setSearchParams({ page: newPage });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const showLoader = isInitialLoading || (data?.peopleList && bufferedPeopleList.length === 0);

  if (showLoader) return (
    <div className="people">
      <Loader className="people__loader" theme="primary" />
    </div>
  );

  if (error) return (
    <div className="people">Error: {error}</div>
  );

  return (
    <div className="people">
      <div className="container">
        <div className="people__body">
          <h1 className="people__title">Popular People</h1>

          <PeopleList 
            peopleList={bufferedPeopleList} 
            pageLoading={isFadingOut || pageLoading} 
          />

          <Pagination 
            currentPage={currentPage}
            totalPages={totalPagesRef.current}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
};
