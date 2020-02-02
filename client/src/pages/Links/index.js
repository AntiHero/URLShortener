import React, { useContext, useState, useEffect, useCallback } from "react";
import { useHttp } from "../../hooks/http.hook";
import Loader from "../../components/Loader";
import AuthContext from "../../context/AuthContext";
import LinkList from "../../components/LinkList";

export const LinksPage = () => {
  const [links, setLinks] = useState([]);

  const { loading, request } = useHttp();
  const { token } = useContext(AuthContext);

  const fetchLinks = useCallback(async () => {
    try {
      const fetched = await request("/api/link", "GET", null, {
        Authorization: `Bearer ${token}`
      });

      setLinks(fetched);
    } catch (e) {}
  }, [token, request]);

  useEffect(() => {
    fetchLinks();
  }, [fetchLinks]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="links-table">{!loading && <LinkList links={links} />}</div>
  );
};
