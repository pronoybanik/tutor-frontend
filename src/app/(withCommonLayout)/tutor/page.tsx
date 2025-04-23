"use client";

import { useState, useEffect } from "react";
import { getAllTutorProfileInfo } from "@/services/Profile";
import Image from "next/image";
import { FaStar } from "react-icons/fa";
import PrimaryButton from "@/components/shared/PrimaryButton";
import Link from "next/link";

// Define the types based on the data structure
interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface Review {
  studentId: User;
  comment: string;
  createdAt: string;
  _id: string;
}

interface Rates {
  discount: number;
  hourlyRate: number;
}

interface TutorProfile {
  rates: Rates;
  _id: string;
  userId: User;
  image: string;
  subjects: string[];
  role: string;
  ratings: number;
  requestRole: string;
  isVerified: boolean;
  callToAction: null | string;
  availability: string[];
  reviews: Review[];
  createdAt: string;
  updatedAt: string;
  __v: number;
  bio: string;
  experience: number;
  location?: string; // Optional, as it doesn't appear in your sample data
}

const TutorPage = () => {
  const [tutors, setTutors] = useState<TutorProfile[]>([]);
  const [filteredTutors, setFilteredTutors] = useState<TutorProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filter states
  const [subjectFilter, setSubjectFilter] = useState("");
  const [ratingFilter, setRatingFilter] = useState("");
  const [rateFilter, setRateFilter] = useState("");
  const [availabilityFilter, setAvailabilityFilter] = useState("");
  const [locationFilter, setLocationFilter] = useState("");

  // Sort state
  const [sortOption, setSortOption] = useState("relevance");

  // Get unique subjects from tutors
  const uniqueSubjects = Array.from(
    new Set(
      tutors.flatMap((tutor) => tutor.subjects).filter((subject) => subject)
    )
  );

  // Get unique availability options
  const uniqueAvailability = Array.from(
    new Set(
      tutors.flatMap((tutor) => tutor.availability).filter((avail) => avail)
    )
  );

  // Get unique locations
  const uniqueLocations = Array.from(
    new Set(
      tutors.map((tutor) => tutor.location).filter((location) => location)
    )
  );

  // Fetch tutors data
  useEffect(() => {
    const fetchTutors = async () => {
      try {
        setLoading(true);
        const response = await getAllTutorProfileInfo();
        console.log("Tutor data:", response);

        // Assuming the response structure is { data: TutorProfile[] }
        const tutorProfiles = response.data || [];
        setTutors(tutorProfiles);
        setFilteredTutors(tutorProfiles);
      } catch (err) {
        console.error("Error fetching tutors:", err);
        setError("Failed to load tutor profiles");
      } finally {
        setLoading(false);
      }
    };

    fetchTutors();
  }, []);

  // Apply filters and sorting
  useEffect(() => {
    let results = [...tutors];

    // Apply subject filter
    if (subjectFilter) {
      results = results.filter((tutor) =>
        tutor.subjects.some((subject) =>
          subject.toLowerCase().includes(subjectFilter.toLowerCase())
        )
      );
    }

    // Apply rating filter
    if (ratingFilter) {
      const minRating = parseFloat(ratingFilter);
      results = results.filter((tutor) => tutor.ratings >= minRating);
    }

    // Apply rate filter
    if (rateFilter) {
      const [min, max] = rateFilter.split("-").map(Number);
      results = results.filter((tutor) => {
        const rate = tutor.rates.hourlyRate;
        return rate >= min && (max ? rate <= max : true);
      });
    }

    // Apply availability filter
    if (availabilityFilter) {
      results = results.filter((tutor) =>
        tutor.availability.includes(availabilityFilter)
      );
    }

    // Apply location filter
    if (locationFilter) {
      results = results.filter((tutor) =>
        tutor.location?.toLowerCase().includes(locationFilter.toLowerCase())
      );
    }

    // Apply sorting
    switch (sortOption) {
      case "rating":
        results.sort((a, b) => b.ratings - a.ratings);
        break;
      case "price":
        results.sort((a, b) => a.rates.hourlyRate - b.rates.hourlyRate);
        break;
      case "priceDesc":
        results.sort((a, b) => b.rates.hourlyRate - a.rates.hourlyRate);
        break;
      case "recency":
        results.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        break;
      case "relevance":
      default:
        // Default sorting (you might want to implement a more sophisticated relevance algorithm)
        break;
    }

    setFilteredTutors(results);

    // Log filter and sort values
    console.log({
      filters: {
        subject: subjectFilter,
        rating: ratingFilter,
        rate: rateFilter,
        availability: availabilityFilter,
        location: locationFilter,
      },
      sort: sortOption,
    });
  }, [
    tutors,
    subjectFilter,
    ratingFilter,
    rateFilter,
    availabilityFilter,
    locationFilter,
    sortOption,
  ]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-64">
        Loading tutors...
      </div>
    );
  if (error) return <div className="text-red-500 text-center">{error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Find a Tutor</h1>

      {/* Filters and Sort Section */}
      <div className="bg-gray-50 p-6 rounded-lg mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {/* Subject Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Subject
            </label>
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={subjectFilter}
              onChange={(e) => setSubjectFilter(e.target.value)}
            >
              <option value="">All Subjects</option>
              {uniqueSubjects.map((subject, index) => (
                <option key={index} value={subject}>
                  {subject}
                </option>
              ))}
            </select>
          </div>

          {/* Rating Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Minimum Rating
            </label>
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={ratingFilter}
              onChange={(e) => setRatingFilter(e.target.value)}
            >
              <option value="">Any Rating</option>
              <option value="4.5">4.5+</option>
              <option value="4">4+</option>
              <option value="3.5">3.5+</option>
              <option value="3">3+</option>
            </select>
          </div>

          {/* Rate Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Hourly Rate
            </label>
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={rateFilter}
              onChange={(e) => setRateFilter(e.target.value)}
            >
              <option value="">Any Price</option>
              <option value="0-25">$0 - $25</option>
              <option value="25-50">$25 - $50</option>
              <option value="50-75">$50 - $75</option>
              <option value="75-100">$75 - $100</option>
              <option value="100">$100+</option>
            </select>
          </div>

          {/* Availability Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Availability
            </label>
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={availabilityFilter}
              onChange={(e) => setAvailabilityFilter(e.target.value)}
            >
              <option value="">Any Availability</option>
              {uniqueAvailability.map((availability, index) => (
                <option key={index} value={availability}>
                  {availability}
                </option>
              ))}
            </select>
          </div>

          {/* Location Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Location
            </label>
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
            >
              <option value="">Any Location</option>
              {uniqueLocations.map((location, index) => (
                <option key={index} value={location}>
                  {location}
                </option>
              ))}
            </select>
          </div>

          {/* Sort Options */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Sort By
            </label>
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
            >
              <option value="relevance">Relevance</option>
              <option value="rating">Highest Rating</option>
              <option value="price">Price: Low to High</option>
              <option value="priceDesc">Price: High to Low</option>
              <option value="recency">Most Recent</option>
            </select>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <p className="text-sm text-gray-600">
            {filteredTutors.length} tutors found
          </p>
          <button
            className="px-4 py-2 bg-black text-white rounded-md  transition"
            onClick={() => {
              setSubjectFilter("");
              setRatingFilter("");
              setRateFilter("");
              setAvailabilityFilter("");
              setLocationFilter("");
              setSortOption("relevance");
            }}
          >
            Clear Filters
          </button>
        </div>
      </div>

      {/* Tutor Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTutors.length > 0 ? (
          filteredTutors.map((tutor) => (
            <div
              key={tutor._id}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <div className="relative h-48 w-full">
                <Image
                  src={tutor.image || "/placeholder-profile.jpg"}
                  alt={`${tutor.userId.name}'s profile`}
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-semibold">{tutor.userId.name}</h3>
                  <div className="flex items-center">
                    <span className="text-yellow-500 mr-1">
                      <FaStar />
                    </span>
                    <span>{tutor.ratings.toFixed(1)}</span>
                  </div>
                </div>

                <div className="mb-3">
                  <p className="text-gray-600 text-sm">
                    <strong>Subjects:</strong>{" "}
                    {tutor.subjects.length > 0
                      ? tutor.subjects.join(", ")
                      : "No subjects specified"}
                  </p>
                </div>

                <div className="mb-4">
                  <p className="text-gray-600 text-sm">
                    <strong>Rate:</strong> ${tutor.rates.hourlyRate}/hour
                    {tutor.rates.discount > 0 && (
                      <span className="ml-2 text-green-500">
                        ({tutor.rates.discount}% off)
                      </span>
                    )}
                  </p>
                </div>

                <Link href={`/tutor/${tutor._id}`}>
                  <PrimaryButton className="w-full">View Profile</PrimaryButton>
                </Link>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-10">
            <p className="text-gray-500">
              No tutors found matching your criteria.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TutorPage;
