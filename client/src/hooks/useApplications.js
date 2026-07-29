import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";

import * as applicationApi from "../api/applicationApi";

function useApplications(initialParams = {}) {
  const [applications, setApplications] = useState([]);
  const [pagination, setPagination] = useState(null);

  const [loading, setLoading] = useState(true);

  const fetchApplications = useCallback(async (params = {}) => {
    try {
      setLoading(true);

      const data = await applicationApi.getApplications({
        ...initialParams,
        ...params,
      });

      setApplications(data.applications);
      setPagination(data.pagination);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to fetch applications."
      );
    } finally {
      setLoading(false);
    }
  }, [initialParams]);

  useEffect(() => {
    fetchApplications();
  }, [fetchApplications]);

  return {
    applications,
    pagination,
    loading,
    fetchApplications,
    setApplications,
  };
}

export default useApplications;