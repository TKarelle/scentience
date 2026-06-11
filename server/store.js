import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ORDERS_DIR = path.join(__dirname, "data", "orders");

function ensureOrdersDir() {
  fs.mkdirSync(ORDERS_DIR, { recursive: true });
}

export function saveOrder(orderId, payload) {
  ensureOrdersDir();
  const filePath = path.join(ORDERS_DIR, `${orderId}.json`);
  fs.writeFileSync(
    filePath,
    JSON.stringify({ ...payload, orderId, createdAt: new Date().toISOString() }, null, 2),
    "utf8",
  );
}

export function loadOrder(orderId) {
  if (!orderId) return null;
  const filePath = path.join(ORDERS_DIR, `${orderId}.json`);
  if (!fs.existsSync(filePath)) return null;
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

export function markOrderPaid(orderId, stripeSessionId) {
  const order = loadOrder(orderId);
  if (!order) return null;
  const updated = {
    ...order,
    status: "paid",
    stripeSessionId,
    paidAt: new Date().toISOString(),
  };
  saveOrder(orderId, updated);
  return updated;
}
