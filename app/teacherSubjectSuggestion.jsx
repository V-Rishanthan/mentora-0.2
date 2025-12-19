import { Brain } from "lucide-react-native";
import { useState } from "react";
import {
  ActivityIndicator,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { getGeminiResponse } from "../service/geminiService";
import Button from "./components/Button";
import SectionTitle from "./components/SectionTitle";

const subjectSuggestion = {
  title: "Core Vue.js Important Topics",
  subjects: [
    "What is Vue.js",
    "Vue instance",
    "Template syntax",
    "Data binding",
  ],
};

export default function TeacherSubjectSuggestion() {
  const [userInput, setUserInput] = useState("");
  const [aiOutput, setAiOutput] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selected, setSelected] = useState([]);

  const handleSendMessage = async () => {
    if (!userInput) return;
    setIsLoading(true);
    setAiOutput([]); // Clear previous output (this is my Referance)
    // setUserInput("")
    const subjectToAsk = userInput;

    // const Prompt = `Expert Educator: Provide a structured list of topics for ${subjectToAsk}.`;
    const Prompt = `List the core topics for "${subjectToAsk}".
Constraints:
- Output a plain bulleted list ONLY.
- No introductory text or concluding remarks.
- No descriptions or explanations for the topics.
- Max 12-15 items.
- Use a simple "Topic Name" format.`;

    try {
      // Call the service and pass the prompt
      const result = await getGeminiResponse(Prompt);

      // display the data
      const parsedList = result
        .split("\n") // Split by line
        .filter((line) => line.trim() !== "") // Remove empty lines
        .map((line) => {
          return line
            .replace(/^\s*[\d.)*•-]+\s*/, "") // Removes: "1.", "1)", "*", "-", "•" and spaces
            .trim();
        });
      // just check the output
      console.log("Gemini Response:", result);
      setAiOutput(parsedList);
    } catch (err) {
      setAiOutput("Error: Could not reach the AI.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      eyboardShouldPersistTaps="handled"
      className="flex-1 px-6 mt-5 bg-secondary"
    >
      <View className="w-full ">
        <Image
          source={require("../assets/images/logo-2.png")}
          className="w-32 h-32"
          resizeMode="contain"
        />
      </View>

      {/* Title Content */}
      <SectionTitle
        hero={"Build Your Teaching Profile"}
        sub={
          "Select your subjects to connect with students who need your expertise"
        }
      />

      {/* Subject fiels */}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="px-8"
      >
        <View className="p-4 mb-5">
          {/* AI Button  */}

          <View className="w-full items-end mb-3">
           

            <TouchableOpacity
            className="bg-white flex-row gap-2 rounded-lg px-4 py-2 items-center"
            onPress={handleSendMessage}
            disabled={isLoading || !userInput.trim()}
          >
            {isLoading ? (
            
              <ActivityIndicator size="small" color="#8681FB" />
            ) : (
              <Brain size={18} color="#8681FB" />
            )}
            <Text className=" font-medium text-primary ml-2">
              {isLoading ? "Processing..." : "AI Assistance"}
            </Text>
          </TouchableOpacity>
          </View>

          {/* Subject input */}
          <View className="flex-row items-center rounded-xl border border-light px-4">
            <TextInput
              className="flex-1 text-gray text-base py-4"
              placeholder="Subject"
              placeholderTextColor="#9ca3af"
              value={userInput}
              onChangeText={setUserInput}
            />
          </View>

          {/* Tags container */}

          <View className="bg-white rounded-xl border border-light p-4 min-h-44 mt-6">
            {selected.length === 0 ? (
              <Text className="text-gray-400 text-base">
                No subjects added yet
              </Text>
            ) : (
              <View className="flex-row flex-wrap gap-2">
                {selected.map((selectedSubject, idx) => (
                  <View
                    key={idx}
                    className="bg-primary/10 border border-primary/20 px-3 py-1 rounded-full flex-row items-center"
                  >
                    <Text className="text-primary font-light text-xs mr-2">
                      {selectedSubject}
                    </Text>
                    <TouchableOpacity
                      onPress={() => {
                        // REMOVE logic: Filter out the clicked subject
                        setSelected(
                          selected.filter((item) => item !== selectedSubject)
                        );
                      }}
                    >
                      <Text className="text-primary font-bold">✕</Text>
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            )}
          </View>

          {/* AI Assistance Suggestion */}
          {aiOutput.length > 0 && (
            <View className="mt-6">
              <Text className="text-lg font-bold text-primary mb-2">
                Recommended for: {userInput}
              </Text>

              <View className="bg-white/50 rounded-2xl p-2">
                {aiOutput.map((subject, idx) => (
                  <TouchableOpacity
                    key={idx}
                    className="mt-2 flex-row items-center  p-3 rounded-xl "
                    onPress={() => {
                      // Logic to "select" this tag
                      if (!selected.includes(subject)) {
                        setSelected((prev) => [...prev, subject]);
                      }

                      console.log("Selected:", subject);
                    }}
                  >
                    <Image
                      source={require("../assets/images/check-mark.png")}
                      className="w-5 h-5 mr-3"
                      resizeMode="contain"
                    />
                    <Text className="text-gray-800 text-base flex-1">
                      {subject}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          )}
        </View>
        {/* button */}
        <View className="mb-6">
          <Button text="Continue " />
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
}
