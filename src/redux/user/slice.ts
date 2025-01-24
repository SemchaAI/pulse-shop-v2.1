import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { IUserSession } from '@/models/auth';

interface SessionState {
  user: IUserSession | null;
  // accessToken: string | null;
}
// const loadInitialState = (): SessionState => {
//   const storedSession = localStorage.getItem('accessToken');
//   if (storedSession) {
//     try {
//       const { user, accessToken } = JSON.parse(storedSession);
//       return { user, accessToken };
//     } catch (error) {
//       console.error('Failed to parse session from localStorage:', error);
//     }
//   }
//   return { user: null, accessToken: null };
// };

const initialState: SessionState = {
  user: null,
  // accessToken: null,
};
export const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    setSession(state, action: PayloadAction<SessionState>) {
      state.user = action.payload.user;
    },
    clearSession(state) {
      state.user = null;
    },
  },
});

export const { setSession, clearSession } = sessionSlice.actions;
