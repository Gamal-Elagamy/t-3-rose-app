export type DashboardSummary = {
    totalProducts: number;
    totalOrders: number;
    totalCategories: number;
    totalRevenue: number;
    currency: string;
};

export type DashboardCategory = {
    id: string;
    title: string;
    productCount: number;
};

export type OrderStatusStats = {
    count: number;
    percent: number;
};

export type DashboardOrderStatus = {
    completed: OrderStatusStats;
    inProgress: OrderStatusStats;
    canceled: OrderStatusStats;
    totalOrders: number;
};

export type RevenuePoint = {
    period: string;
    label: string;
    revenue: number;
};

export type DashboardRevenue = {
    period: string;
    points: RevenuePoint[];
};

export type TopSellingProduct = {
    productId: string;
    title: string;
    unitPrice: number;
    totalSales: number;
};

export type LowStockProduct = {
    id: string;
    title: string;
    stock: number;
};

export type DashboardPayload = {
    summary: DashboardSummary;
    categories: DashboardCategory[];
    orderStatus: DashboardOrderStatus;
    revenue: DashboardRevenue;
    topSellingProducts: TopSellingProduct[];
    lowStockProducts: LowStockProduct[];
};
