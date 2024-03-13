import pandas as pd

# Load the CSV file
df = pd.read_csv('./python/arduinoCsv/historic-data-20240309T184621Z/BPM-heartBPM.csv')

# Convert the 'time' column to a datetime object while reading from the CSVx
df['time'] = pd.to_datetime(df['time'], format='%Y-%m-%dT%H:%M:%S.%fZ')

# Create 'date' and 'time' columns from the 'time' column
df['date'] = df['time'].dt.strftime('%Y-%m-%d')
df['time'] = df['time'].dt.strftime('%H:%M:%S')

# Arrange the DataFrame to only include the 'date', 'time', and 'value' columns
formatted_df = df[['date', 'time', 'value']]

# Output the first few rows to verify
print(formatted_df.head())

# Save the formatted DataFrame to a new CSV file
formatted_df.to_csv('./python/csvFiles/formatted_BPM-heartBPM.csv', index=False)
