import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

// Report interface
export interface Report {
  _id: string;
  type: 'INVENTORY_REPORT' | 'EXPIRATION_REPORT' | 'SUPPLIER_REPORT';
  name: string;
  status: 'PENDING' | 'COMPLETED' | 'FAILED';
  file_url?: string;
  createdAt: string;
  updatedAt: string;
}

// Report statistics interface
export interface ReportStats {
  overview: {
    total: number;
    completed: number;
    pending: number;
    failed: number;
    successRate: string;
  };
  byType: {
    inventory: number;
    expiration: number;
    supplier: number;
  };
  activity: {
    today: number;
    lastWeek: number;
  };
  financial: {
    monthlyRevenue: number;
    inventoryValue: number;
    expiredLoss: number;
    revenueChange: string;
  };
}

// Report state interface
interface ReportState {
  reports: Report[];
  stats: ReportStats | null;
  loading: boolean;
  error: string | null;
  generatingReport: boolean;
  loadingStats: boolean;
}

// Initial state
const initialState: ReportState = {
  reports: [],
  stats: null,
  loading: false,
  error: null,
  generatingReport: false,
  loadingStats: false,
};

// Async thunks
export const fetchReports = createAsyncThunk(
  'reports/fetchReports',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('http://localhost:5000/api/reports');
      const data = await response.json();
      
      if (!response.ok) {
        return rejectWithValue(data.message || 'Failed to fetch reports');
      }
      
      return data.reports;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch reports');
    }
  }
);

export const generateReport = createAsyncThunk(
  'reports/generateReport',
  async (reportType: 'INVENTORY_REPORT' | 'EXPIRATION_REPORT' | 'SUPPLIER_REPORT', { rejectWithValue }) => {
    try {
      const response = await fetch('http://localhost:5000/api/reports', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ type: reportType }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        return rejectWithValue(data.message || 'Failed to generate report');
      }
      
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to generate report');
    }
  }
);

export const generateSupplierReport = createAsyncThunk(
  'reports/generateSupplierReport',
  async (supplierId: string, { rejectWithValue }) => {
    try {
      const response = await fetch(`http://localhost:5000/api/reports/supplier/${supplierId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        return rejectWithValue(data.message || 'Failed to generate supplier report');
      }
      
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to generate supplier report');
    }
  }
);

export const getReport = createAsyncThunk(
  'reports/getReport',
  async (reportId: string, { rejectWithValue }) => {
    try {
      const response = await fetch(`http://localhost:5000/api/reports/${reportId}`);
      const data = await response.json();
      
      if (!response.ok) {
        return rejectWithValue(data.message || 'Failed to fetch report');
      }
      
      return data.report;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch report');
    }
  }
);

export const downloadReport = createAsyncThunk(
  'reports/downloadReport',
  async (fileUrl: string, { rejectWithValue }) => {
    try {
      // Extract filename from URL
      const filename = fileUrl.split('/').pop() || 'report.pdf';
      
      // Fetch the PDF file
      const response = await fetch(`http://localhost:5000${fileUrl}`);
      
      if (!response.ok) {
        return rejectWithValue('Failed to download report');
      }
      
     
      const blob = await response.blob();
      
      // Create download link
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      
      // Cleanup
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      
      return { success: true, filename };
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to download report');
    }
  }
);

export const fetchReportStats = createAsyncThunk(
  'reports/fetchReportStats',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('http://localhost:5000/api/reports/stats');
      const data = await response.json();
      
      if (!response.ok) {
        return rejectWithValue(data.message || 'Failed to fetch report statistics');
      }
      
      return data.stats;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch report statistics');
    }
  }
);

// Report slice
const reportSlice = createSlice({
  name: 'reports',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    updateReportStatus: (state, action: PayloadAction<{ id: string; status: Report['status']; file_url?: string }>) => {
      const report = state.reports.find(r => r._id === action.payload.id);
      if (report) {
        report.status = action.payload.status;
        if (action.payload.file_url) {
          report.file_url = action.payload.file_url;
        }
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch reports
      .addCase(fetchReports.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchReports.fulfilled, (state, action: PayloadAction<Report[]>) => {
        state.loading = false;
        state.reports = action.payload;
      })
      .addCase(fetchReports.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // Generate report
      .addCase(generateReport.pending, (state) => {
        state.generatingReport = true;
        state.error = null;
      })
      .addCase(generateReport.fulfilled, (state, action) => {
        state.generatingReport = false;
        // Auto-download the generated report if downloadUrl is provided
        if (action.payload.downloadUrl) {
          const link = document.createElement('a');
          link.href = action.payload.downloadUrl;
          link.download = action.payload.downloadUrl.split('/').pop() || 'report.pdf';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }
      })
      .addCase(generateReport.rejected, (state, action) => {
        state.generatingReport = false;
        state.error = action.payload as string;
      })
      
      // Generate supplier report
      .addCase(generateSupplierReport.pending, (state) => {
        state.generatingReport = true;
        state.error = null;
      })
      .addCase(generateSupplierReport.fulfilled, (state, action) => {
        state.generatingReport = false;
        // Auto-download the generated supplier report if downloadUrl is provided
        if (action.payload.downloadUrl) {
          const link = document.createElement('a');
          link.href = action.payload.downloadUrl;
          link.download = action.payload.downloadUrl.split('/').pop() || 'supplier_report.pdf';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }
      })
      .addCase(generateSupplierReport.rejected, (state, action) => {
        state.generatingReport = false;
        state.error = action.payload as string;
      })
      
      // Get report
      .addCase(getReport.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getReport.fulfilled, (state, action: PayloadAction<Report>) => {
        state.loading = false;
        const index = state.reports.findIndex(r => r._id === action.payload._id);
        if (index !== -1) {
          state.reports[index] = action.payload;
        }
      })
      .addCase(getReport.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // Download report
      .addCase(downloadReport.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(downloadReport.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(downloadReport.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // Fetch report stats
      .addCase(fetchReportStats.pending, (state) => {
        state.loadingStats = true;
        state.error = null;
      })
      .addCase(fetchReportStats.fulfilled, (state, action: PayloadAction<ReportStats>) => {
        state.loadingStats = false;
        state.stats = action.payload;
      })
      .addCase(fetchReportStats.rejected, (state, action) => {
        state.loadingStats = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError, updateReportStatus } = reportSlice.actions;
export default reportSlice.reducer;
