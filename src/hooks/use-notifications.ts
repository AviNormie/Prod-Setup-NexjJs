import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((response) => response.json());

type Notification = {
  id: string;
  message: string;
  is_read: boolean;
  created_at: string;
};

export function useNotifications() {
  return useSWR<{ data: Notification[] }>("/api/notifications", fetcher, {
    refreshInterval: 60_000,
  });
}
