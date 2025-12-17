export interface User {
    _id: string;
    fullName: string;
    email: string;
    mobile?: string;
}

const USER_KEY = 'college_app_user';

export const auth = {
    login: (user: User) => {
        localStorage.setItem(USER_KEY, JSON.stringify(user));
    },
    logout: () => {
        localStorage.removeItem(USER_KEY);
    },
    getUser: (): User | null => {
        const u = localStorage.getItem(USER_KEY);
        return u ? JSON.parse(u) : null;
    },
    isAuthenticated: () => {
        return !!localStorage.getItem(USER_KEY);
    }
};
