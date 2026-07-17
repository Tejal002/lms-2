import React, { useEffect } from 'react'
import { useCurrentUserQuery } from './apis/authApi'
import { useDispatch, useSelector } from 'react-redux';
import { loginSlice, logoutSlice } from './slices/authSlice';
import { Navigate } from 'react-router-dom';

export function ProtectedRoute({ children }) {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);

    const { data, error, isLoading } = useCurrentUserQuery(undefined, {
        skip: !user,
        refetchOnMountOrArgChange: true,
    });

    console.log(data, error, isLoading );
    useEffect(() => {
        if (isLoading) return;

       
        if (data) {
            dispatch(loginSlice(data));
        }

       
        if (error?.status === 401||error?.status === 500) {
            dispatch(logoutSlice());
        }

    }, [data, error, isLoading, dispatch]);

   
    if (isLoading) {
        return <p>Checking session.....</p>;
    }

  
    if (!user) {
        return <Navigate to="/auth" replace />;
    }

    
    if (error?.status === 401||error?.status === 500) {
        
        return <Navigate to="/auth" replace />;
    }

    return children;
}


export function InstructorRoute({ children }) {
    const dispatch=useDispatch();
    const user = useSelector(state => state.auth.user);
    const { data, error, isLoading } = useCurrentUserQuery(undefined, {
        skip: !user,
        refetchOnMountOrArgChange:true
    })

    useEffect(() => {
        if (isLoading) {
            return
        }
        if (data) {
            dispatch(loginSlice(data))
        }
        if (error) {
            dispatch(logoutSlice());
        }
    }, [data, error, isLoading, dispatch]);

    if (!user) {
        return <Navigate to="/auth" replace></Navigate>
    }

    if (isLoading) {
        return <p className="text-sm text-muted-foreground">Checking session...</p>;
    }

    if (error) {
        return <Navigate to="/auth" replace />;
    }

    if (user.role !== "instructor") {
        return <Navigate to="/" replace />;
    }

    return children;
}