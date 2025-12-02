// Local authentication and user management
export interface User {
  email: string;
  password: string; // In production, this should be hashed
  isActivated: boolean;
  activationCode?: string;
  mpesaCode?: string;
  downloadsRemaining: number;
  createdAt: string;
}

const USERS_KEY = 'cv_builder_users';
const CURRENT_USER_KEY = 'cv_builder_current_user';

export const getUsers = (): User[] => {
  const users = localStorage.getItem(USERS_KEY);
  return users ? JSON.parse(users) : [];
};

const saveUsers = (users: User[]) => {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

export const getCurrentUser = (): User | null => {
  const email = localStorage.getItem(CURRENT_USER_KEY);
  if (!email) return null;
  
  const users = getUsers();
  return users.find(u => u.email === email) || null;
};

export const signup = async (email: string, password: string, mpesaCode: string): Promise<{ success: boolean; error?: string }> => {
  const users = getUsers();
  
  if (users.find(u => u.email === email)) {
    return { success: false, error: 'Email already registered' };
  }
  
  const newUser: User = {
    email,
    password, // In production, hash this
    isActivated: false,
    mpesaCode,
    downloadsRemaining: 3,
    createdAt: new Date().toISOString()
  };
  
  users.push(newUser);
  saveUsers(users);
  localStorage.setItem(CURRENT_USER_KEY, email);
  
  // Notify admin via backend
  try {
    const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/notify-admin-signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`
      },
      body: JSON.stringify({
        userEmail: email,
        mpesaCode
      })
    });
    
    if (!response.ok) {
      console.error('Failed to notify admin');
    }
  } catch (error) {
    console.error('Error notifying admin:', error);
  }
  
  return { success: true };
};

export const login = (email: string, password: string): { success: boolean; error?: string } => {
  const users = getUsers();
  const user = users.find(u => u.email === email && u.password === password);
  
  if (!user) {
    return { success: false, error: 'Invalid email or password' };
  }
  
  localStorage.setItem(CURRENT_USER_KEY, email);
  return { success: true };
};

export const logout = () => {
  localStorage.removeItem(CURRENT_USER_KEY);
};

export const updateUser = (updates: Partial<User>) => {
  const currentEmail = localStorage.getItem(CURRENT_USER_KEY);
  if (!currentEmail) return;
  
  const users = getUsers();
  const userIndex = users.findIndex(u => u.email === currentEmail);
  
  if (userIndex !== -1) {
    users[userIndex] = { ...users[userIndex], ...updates };
    saveUsers(users);
  }
};

export const activateUser = (activationCode: string): { success: boolean; error?: string } => {
  const currentEmail = localStorage.getItem(CURRENT_USER_KEY);
  if (!currentEmail) return { success: false, error: 'Not logged in' };
  
  const users = getUsers();
  const userIndex = users.findIndex(u => u.email === currentEmail);
  
  if (userIndex === -1) {
    return { success: false, error: 'User not found' };
  }
  
  // Check against fixed activation code
  if (activationCode === 'JMS3056!') {
    users[userIndex].isActivated = true;
    users[userIndex].downloadsRemaining = 3;
    users[userIndex].activationCode = activationCode;
    saveUsers(users);
    return { success: true };
  }
  
  return { success: false, error: 'Invalid activation code' };
};

export const decrementDownloads = (): { success: boolean; remaining: number } => {
  const currentEmail = localStorage.getItem(CURRENT_USER_KEY);
  if (!currentEmail) return { success: false, remaining: 0 };
  
  const users = getUsers();
  const userIndex = users.findIndex(u => u.email === currentEmail);
  
  if (userIndex !== -1 && users[userIndex].downloadsRemaining > 0) {
    users[userIndex].downloadsRemaining -= 1;
    saveUsers(users);
    return { success: true, remaining: users[userIndex].downloadsRemaining };
  }
  
  return { success: false, remaining: 0 };
};

export const renewAccess = (mpesaCode: string): { success: boolean; error?: string } => {
  const currentEmail = localStorage.getItem(CURRENT_USER_KEY);
  if (!currentEmail) return { success: false, error: 'Not logged in' };
  
  const users = getUsers();
  const userIndex = users.findIndex(u => u.email === currentEmail);
  
  if (userIndex === -1) {
    return { success: false, error: 'User not found' };
  }
  
  // Store new MPESA code and deactivate until admin confirms
  users[userIndex].mpesaCode = mpesaCode;
  users[userIndex].isActivated = false;
  users[userIndex].activationCode = undefined;
  saveUsers(users);
  
  return { success: true };
};
