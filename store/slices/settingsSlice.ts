import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import api from "../../lib/api";

interface PersonalInfo {
  name: string;
  email: string;
  phone: string;
  role: string;
}

interface Preferences {
  currency: string;
  language: string;
  timezone: string;
  dateFormat: string;
}

interface Notifications {
  emailNotifications: boolean;
  smsNotifications: boolean;
  lowStockAlerts: boolean;
  expiryAlerts: boolean;
}

interface BackupConfiguration {
  frequency: string;
  retentionDays: number;
  location: string;
  autoBackup: boolean;
}

interface SystemStatus {
  lastBackup: {
    date: string;
    time: string;
    status: string;
  };
  databaseSize: string;
  storageUsage: {
    used: number;
    total: number;
    status: string;
  };
}

interface BackupStatus {
  configuration: BackupConfiguration;
  systemStatus: SystemStatus;
}

interface SettingsState {
  personalInfo: PersonalInfo;
  preferences: Preferences;
  notifications: Notifications;
  backup: BackupStatus | null;
  backupConfig: BackupConfiguration;
  loading: boolean;
  error: string | null;
  saving: boolean;
  backupLoading: boolean;
}

const initialState: SettingsState = {
  personalInfo: {
    name: "",
    email: "",
    phone: "",
    role: ""
  },
  preferences: {
    currency: "RWF",
    language: "English",
    timezone: "Africa/Kigali",
    dateFormat: "DD/MM/YYYY"
  },
  notifications: {
    emailNotifications: true,
    smsNotifications: false,
    lowStockAlerts: true,
    expiryAlerts: true
  },
  backup: null,
  backupConfig: {
    frequency: "Daily",
    retentionDays: 30,
    location: "Cloud Storage",
    autoBackup: true
  },
  loading: false,
  error: null,
  saving: false,
  backupLoading: false
};

// Async thunk to fetch user settings
export const fetchUserSettings = createAsyncThunk(
  "settings/fetchUserSettings",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/settings");
      return response.data.settings;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch settings");
    }
  }
);

// Async thunk to update user settings
export const updateUserSettings = createAsyncThunk(
  "settings/updateUserSettings",
  async (settings: { personalInfo?: Partial<PersonalInfo>; preferences?: Partial<Preferences>; notifications?: Partial<Notifications>; backupConfig?: Partial<BackupConfiguration> }, { rejectWithValue }) => {
    try {
      const response = await api.put("/settings", settings);
      return response.data.settings;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to update settings");
    }
  }
);

// Async thunk to fetch backup status
export const fetchBackupStatus = createAsyncThunk(
  "settings/fetchBackupStatus",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/settings/backup");
      return response.data.backup;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch backup status");
    }
  }
);

// Async thunk to initiate backup
export const initiateBackup = createAsyncThunk(
  "settings/initiateBackup",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.post("/settings/backup");
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to initiate backup");
    }
  }
);

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    updatePersonalInfo: (state, action: PayloadAction<Partial<PersonalInfo>>) => {
      state.personalInfo = { ...state.personalInfo, ...action.payload };
    },
    updatePreferences: (state, action: PayloadAction<Partial<Preferences>>) => {
      state.preferences = { ...state.preferences, ...action.payload };
    },
    updateNotifications: (state, action: PayloadAction<Partial<Notifications>>) => {
      state.notifications = { ...state.notifications, ...action.payload };
    },
    updateBackupConfig: (state, action: PayloadAction<Partial<BackupConfiguration>>) => {
      state.backupConfig = { ...state.backupConfig, ...action.payload };
    },
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch settings
      .addCase(fetchUserSettings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserSettings.fulfilled, (state, action) => {
        state.loading = false;
        state.personalInfo = action.payload.personalInfo;
        state.preferences = action.payload.preferences;
        state.notifications = action.payload.notifications;
        state.error = null;
      })
      .addCase(fetchUserSettings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Update settings
      .addCase(updateUserSettings.pending, (state) => {
        state.saving = true;
        state.error = null;
      })
      .addCase(updateUserSettings.fulfilled, (state, action) => {
        state.saving = false;
        state.personalInfo = action.payload.personalInfo;
        state.preferences = action.payload.preferences;
        state.notifications = action.payload.notifications;
        state.error = null;
      })
      .addCase(updateUserSettings.rejected, (state, action) => {
        state.saving = false;
        state.error = action.payload as string;
      })
      // Fetch backup status
      .addCase(fetchBackupStatus.pending, (state) => {
        state.backupLoading = true;
        state.error = null;
      })
      .addCase(fetchBackupStatus.fulfilled, (state, action) => {
        state.backupLoading = false;
        state.backup = action.payload;
        state.error = null;
      })
      .addCase(fetchBackupStatus.rejected, (state, action) => {
        state.backupLoading = false;
        state.error = action.payload as string;
      })
      // Initiate backup
      .addCase(initiateBackup.pending, (state) => {
        state.backupLoading = true;
        state.error = null;
      })
      .addCase(initiateBackup.fulfilled, (state, action) => {
        state.backupLoading = false;
        state.error = null;
        // Update backup status if needed
      })
      .addCase(initiateBackup.rejected, (state, action) => {
        state.backupLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { updatePersonalInfo, updatePreferences, updateNotifications, updateBackupConfig, clearError } = settingsSlice.actions;
export default settingsSlice.reducer;
