// Products and solutions with their own color theme. Services pages stay neutral (no brand).
export type Brand = "infraledger" | "sap" | "oracle" | "odoo" | "labs";

export const brands: Record<Brand, { name: string; href: string; text: string; color: string }> = {
  infraledger: { name: "InfraLedger", href: "/product", text: "Our self-hosted cloud platform", color: "#4F46E5" },
  sap: { name: "SAP", href: "/sap", text: "Implementation, migration, integration", color: "#0070F2" },
  oracle: { name: "Oracle", href: "/oracle", text: "Database administration and failover", color: "#C74634" },
  odoo: { name: "Odoo", href: "/odoo", text: "ERP implementation and hosting", color: "#714B67" },
  labs: { name: "Cyber labs", href: "/labs", text: "Isolated security training", color: "#15803D" },
};
