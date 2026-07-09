import json
import boto3
import uuid

dynamodb = boto3.resource('dynamodb')

messagesTable = dynamodb.Table('Messages')

def lambda_handler(event, context):

    body = json.loads(event['body'])

    receiver = body['receiver']
    message = body['message']

    messagesTable.put_item(
        Item={
            'messageId': str(uuid.uuid4()),
            'receiver': receiver,
            'message': message
        }
    )

    return {
        'statusCode': 200,
        'body': 'Message Saved'
    }
