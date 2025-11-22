export interface Transaction {
  id: string;
  title: string;
  category: string;
  amount: number;
  date: string;
  type: "credit" | "debit";
}

export interface ChartDataPoint {
  date: string;
  balance: number;
}

export type AIAnalysisStatus = "idle" | "loading" | "success" | "error";

export interface User {
  _id: string;
  username: string;
  balance?: number;
}

export interface RequestState {
  username: string;
  status: string;
  from: {
    username: string;
    _id?: string;
  };
  _id?: string;
}

export interface History {
  _id: string;
  amount: string;
  from: {
    username: string;
    _id?: string;
  };
  to: {
    username: string;
    _id: string;
  };
  status?: string;
  createdAt?: string;
}
