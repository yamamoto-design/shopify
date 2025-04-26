import { Page, Layout, Card, TextField, Button } from "@shopify/polaris";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { fetchRepliData } from "../app/features/repli/repliSlice";
// import mocker from "../mockReviews.json";
import ReviewCard from "../components/ReviewCard";
import StatsCard from "../components/StatsCard";

const nameArr = ["Jack", "Danilo", "Maria", "John", "Alice", "Bob"];

export default function Dashboard() {
  // const [reviews, setReviews] = useState([]);
  // const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();
  const { items, status, error } = useSelector((state) => state.repli);

  useEffect(() => {
    dispatch(fetchRepliData());
  }, [dispatch]);

  return (
    <Page title="Review Sentiment Analyzer">
      <Layout>
        <Layout.Section>
          <StatsCard reviews={items} />
        </Layout.Section>

        <Layout.Section>
          <Card sectioned>
            <TextField
              label="Search reviews"
              placeholder="Type keywords..."
              connectedRight={<Button primary>Search</Button>}
            />
          </Card>
        </Layout.Section>
        <Layout.Section>
          {status === "loading" ? (
            <p>Loading reviews...</p>
          ) : (
            items?.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))
          )}
        </Layout.Section>
      </Layout>
    </Page>
  );
}
