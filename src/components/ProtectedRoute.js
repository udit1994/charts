import React from "react";
import { Redirect } from "react-router-dom";

import { getToken } from "lib/auth";
import { InternalLayout } from "components";

function ProtectedRoute({ component: Component }) {
  const token = getToken();

  if (!token) {
    return <Redirect to={{ pathname: "/" }} />;
  }

  return (
    <InternalLayout>
      <Component />
    </InternalLayout>
  );
}

export default ProtectedRoute;
