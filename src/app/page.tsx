import App from "../App";
import { getLandingData } from "../lib/wp";

export default async function Page() {
  const { menus, options, modules } = await getLandingData();
  return <App menus={menus} options={options} modules={modules} />;
}
