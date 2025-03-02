"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SubmitHandler, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import NMImageUploader from "@/components/ui/core/NMImageUploader";
import ImagePreviewer from "@/components/ui/core/NMImageUploader/ImagePreviewer";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ICategory } from "@/types";
import { getAllCategory } from "@/services/Category";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { createSubject } from "@/services/Subject";

const AddSubjectForm = () => {
  const form = useForm({
    defaultValues: {
      name: "",
      price: "",
      gradeLevel: "",
      category: "",
      image: null,
    },
  });

  const {
    formState: { isSubmitting },
  } = form;

  const router = useRouter();
  const [imageFiles, setImageFiles] = useState<File[] | []>([]);
  const [imagePreview, setImagePreview] = useState<string[] | []>([]);
  const [categories, setCategories] = useState<ICategory[] | []>([]);

  useEffect(() => {
    const fetchData = async () => {
      const categoriesData = await getAllCategory();
      setCategories(categoriesData.data);
    };
    fetchData();
  }, []);

  // Submit handler
  const onSubmit: SubmitHandler<any> = async (data) => {
    const modifiedData = {
      ...data,
      price: parseFloat(data.price),
      image: imageFiles.length > 0 ? imageFiles[0] : null,
    };

    const formData = new FormData();
    formData.append("data", JSON.stringify(modifiedData));
    if (imageFiles.length > 0) {
      formData.append("image", imageFiles[0]);
    }

    try {
      const res = await createSubject(formData);
      if (res.success) {
        toast.success(res.message);
        router.push("/dashboard/subjects");
      } else {
        toast.error(res.message);
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong!");
    }
  };

  return (
    <div className="border border-gray-300 rounded-lg p-6 max-w-2xl w-full mx-auto bg-white shadow-md">
      <h1 className="text-2xl font-bold text-center mb-5">Add Subject</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          {/* Name & Price */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Subject Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      value={field.value || ""}
                      placeholder="Enter subject name"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price ($)</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      value={field.value || ""}
                      placeholder="Enter price"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Grade Level */}
          <div className="mt-4">
            <FormField
              control={form.control}
              name="gradeLevel"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Grade Level</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      value={field.value || ""}
                      placeholder="e.g., Grade 10, High School"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Category */}
          <div className="mt-4">
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Subject Category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category?._id} value={category?._id}>
                          {category?.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Image Upload */}
          <div className="mt-4">
            <p className="text-lg font-semibold">Upload Image</p>
            <div className="flex gap-4  mt-2">
              <NMImageUploader
                setImageFiles={setImageFiles}
                setImagePreview={setImagePreview}
                label="Upload"
              />
              <ImagePreviewer
                setImageFiles={setImageFiles}
                imagePreview={imagePreview}
                setImagePreview={setImagePreview}
              />
            </div>
          </div>

          {/* Submit Button */}
          <Button type="submit" className="mt-6 w-full" disabled={isSubmitting}>
            {isSubmitting ? "Adding Subject..." : "Add Subject"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default AddSubjectForm;
